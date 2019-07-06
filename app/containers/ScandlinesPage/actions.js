
import {
  LOAD_DEPARTURES,
  DEPARTURES_BATCH_LOADED,
  LOAD_DEPARTURES_ERROR,
  DEPARTURES_ALL_LOADED,
  ERASE_DEPARTURES
} from './constants';

export function loadDepartures(formValues) {
  return {
    type: LOAD_DEPARTURES,
    formValues
  };
}

export function eraseDepartures() {
  return {
    type: ERASE_DEPARTURES
  };
}

export function departuresBatchLoaded(departures) {
  return {
    type: DEPARTURES_BATCH_LOADED,
    departures
  };
}

export function allDeparturesLoaded() {
  return {
    type: DEPARTURES_ALL_LOADED,
  };
}

export function departuresLoadingError(error) {
  return {
    type: LOAD_DEPARTURES_ERROR,
    error,
  };
}
