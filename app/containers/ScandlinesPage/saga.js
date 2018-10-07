import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_DEPARTURES } from './constants';
import { departuresBatchLoaded, departuresLoadingError } from './actions';
import { createSelector } from 'reselect';

import request from 'utils/request';
import { makeSelectRoute } from './selectors';
import { makeSelectDepartures } from './selectors';
import moment from 'moment'

export function* getDepartures(action) {

	const formValues = action.formValues
	const fromDate = formValues.fromDate
	const toDate = formValues.toDate
	const route = formValues.route

	const requestURL = `/api/scandlines`;

	try {

		let date = moment(fromDate)
		while (moment(toDate).isAfter(date)) {
			var options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'route': route,
					'year': date.toObject().years,
					'month': date.toObject().months,
					'day': date.toObject().date,
					'hour': date.toObject().hours,
					'minute': date.toObject().minutes,
					'second': date.toObject().seconds
				})
			}

			const scandlinesResponse = yield call(request, requestURL, options);
			const departuresTree = scandlinesResponse.map(response => response.outboundDepartures)
			const departures = departuresTree.flatMap(c => c)
			const sortedDepartures = departures.sort((a,b) => moment(a.departureDateTime).isAfter(moment(b.departureDateTime)))

			const lastDeparture = sortedDepartures[sortedDepartures.length - 1]
			const lastDepartureDateTime = sortedDepartures.length > 0 ? moment(lastDeparture.departureDateTime) : moment(lastDepartureDateTime).add(1, 'hours');

			const alreadyLoadedDepartures = yield select(makeSelectDepartures())
			const allDepartures = [...alreadyLoadedDepartures, ...departures]
			allDepartures.forEach(departure => { departure.route = route });
			yield put(departuresBatchLoaded(allDepartures))

			date = moment(lastDepartureDateTime).add(1,'minutes')
		}

		yield put(departuresBatchLoaded(allDepartures))

	} catch (err) {
		yield put(departuresLoadingError(err));
	}
}

export default function* departureData() {
	yield takeLatest(LOAD_DEPARTURES, getDepartures);
}
