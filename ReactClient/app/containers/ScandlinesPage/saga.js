import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_DEPARTURES } from 'containers/App/constants';
import { departuresLoaded, departuresLoadingError } from 'containers/App/actions';
import { createSelector } from 'reselect';

import request from 'utils/request';
import { makeSelectRoute } from 'containers/ScandlinesPage/selectors';
import { makeSelectDepartures } from 'containers/App/selectors';

export function* getDepartures() {


	const requestURL = `http://localhost:3500/api/scandlines`;

	try {
		for (let day = 14; day < 30; day++) {

			var options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'year': 2018,
					'month': 8,
					'day': day,
					'hour': 1,
					'minute': 0,
					'second': 0
				})
			}

			let alreadyLoadedDepartures = yield select(makeSelectDepartures())
			const scandlinesResponse = yield call(request, requestURL, options);
			const aggregatedDepartures = scandlinesResponse.map(response => response.outboundDepartures)
			const departures = aggregatedDepartures.flatMap(c => c)

			const allDepartures = [...alreadyLoadedDepartures, ...departures]

			yield put(departuresLoaded(allDepartures))
		}

	} catch (err) {
		yield put(departuresLoadingError(err));
	}
}

export default function* departureData() {
	yield takeLatest(LOAD_DEPARTURES, getDepartures);
}
