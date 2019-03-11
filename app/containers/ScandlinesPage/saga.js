import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_DEPARTURES } from './constants';
import { departuresBatchLoaded, allDeparturesLoaded, departuresLoadingError } from './actions';
import { createSelector } from 'reselect';

import request from 'utils/request';
import { makeSelectRoute } from './selectors';
import { makeSelectDepartures } from './selectors';
import moment from 'moment'

const clonedeep = require('lodash.clonedeep')

export function* 
getDepartures(action) {

	const formValues = action.formValues
	const fromDate = moment(formValues.fromDate)
	const toDate = moment(formValues.toDate)
	const route = formValues.route

	const requestURL = `/api/scandlines`;

	try {
		let mergedDepartures;
		let firstRequestDate = moment(fromDate)

		let lastRequestDate;
		let lastResponse;

		let requestDate = clonedeep(firstRequestDate)

		while (moment(toDate).isAfter(requestDate)) {
			if (!lastRequestDate || !requestDate.isSame(lastRequestDate)) {

				var requestOptions = getRequestOptions(requestDate)
				const currentResponse = yield call(request, requestURL, requestOptions);

				const departuresTree = currentResponse.map(response => response.outboundDepartures)
				const departuresOnResponse = departuresTree.flatMap(c => c)

				const sortedDepartures = departuresOnResponse.sort((a, b) => moment(a.departureDateTime).isAfter(moment(b.departureDateTime)))
				const departuresInState = yield select(makeSelectDepartures())

				const currentResponseLastArrivalTime = currentResponse[0].outboundDepartures[currentResponse[0].outboundDepartures.length-1].arrivalDateTime
				const lastResponseLastArrivalTime = lastResponse && lastResponse[0].outboundDepartures[lastResponse[0].outboundDepartures.length-1].arrivalDateTime

				if (!lastResponse || (currentResponseLastArrivalTime) != (lastResponseLastArrivalTime)) {
					lastResponse = clonedeep(currentResponse);
					lastRequestDate = clonedeep(requestDate)
					requestDate = getNextRequestDate(sortedDepartures, requestDate);

					mergedDepartures = [...departuresInState, ...departuresOnResponse]
					mergedDepartures.forEach(departure => { departure.route = route });
					yield put(departuresBatchLoaded(mergedDepartures))
				}
				else {
					lastRequestDate = clonedeep(requestDate)
					requestDate = requestDate.add(15, 'minutes');
				}
			}
			else {
				requestDate = moment(requestDate).add(60, 'minutes')
			}
		}

		const mergedDeparturesFinal = mergedDepartures.filter(d => moment(d.departureDateTime).isBefore(toDate))
		yield put(allDeparturesLoaded(mergedDeparturesFinal))

	} catch (err) {
		console.log(err)
		yield put(departuresLoadingError(err));
	}

	function getNextRequestDate(sortedDepartures, requestDate) {
		const lastDeparture = sortedDepartures[sortedDepartures.length - 1];
		const lastDepartureDateTime = sortedDepartures.length > 0 ? moment(lastDeparture.departureDateTime) : moment(lastDepartureDateTime).add(1, 'hours');
		requestDate = moment(lastDepartureDateTime).add(15, 'minutes');
		return requestDate;
	}

	function getRequestOptions(requestDate) {
		return {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'route': route,
				'year': requestDate.toObject().years,
				'month': requestDate.toObject().months,
				'day': requestDate.toObject().date,
				'hour': requestDate.toObject().hours,
				'minute': requestDate.toObject().minutes,
				'second': requestDate.toObject().seconds
			})
		};
	}
}

export default function* departureData() {
	yield takeLatest(LOAD_DEPARTURES, getDepartures);
}
