/**
 * The global state selectors
 */

import { createSelector } from 'reselect'

const makeSelectLoading = () => createSelector(
	(state) => state.get('scandlines'),
	(scandlinesState) => scandlinesState.get('loading')
)

const makeSelectError = () => createSelector(
	(state) => state.get('scandlines'),
	(scandlinesState) => scandlinesState.get('error')
)

const makeSelectDepartures = () => createSelector(
	(state) => state.get('scandlines'),
	(scandlinesState) => scandlinesState.get('departures')
)

export {
	makeSelectDepartures,
	makeSelectLoading,
	makeSelectError
}
