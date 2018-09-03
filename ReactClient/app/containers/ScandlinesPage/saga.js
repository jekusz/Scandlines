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
					'year': date.toObject().years,
					'month': date.toObject().months,
					'day': date.toObject().date,
					'hour': date.toObject().hours,
					'minute': date.toObject().minutes,
					'second': date.toObject().seconds
				})
			}
			const alreadyLoadedDepartures = yield select(makeSelectDepartures())
			const scandlinesResponse = yield call(request, requestURL, options);
			const aggregatedDepartures = scandlinesResponse.map(response => response.outboundDepartures)
			const departures = aggregatedDepartures.flatMap(c => c)
			const sortedDepartures = departures.sort((a,b) => moment(a.departureDateTime).isAfter(moment(b.departureDateTime)))
			const lastDeparture = sortedDepartures[sortedDepartures.length - 1]
			const lastDepartureDateTime = moment(lastDeparture.departureDateTime)

			const allDepartures = [...alreadyLoadedDepartures, ...departures]
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
