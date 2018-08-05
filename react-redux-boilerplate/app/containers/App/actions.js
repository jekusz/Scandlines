/*
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_DEPARTURES,
  LOAD_DEPARTURES_SUCCESS,
  LOAD_DEPARTURES_ERROR
} from './constants';

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function loadDepartures() {
  return {
    type: LOAD_DEPARTURES,
  };
}

export function departuresLoaded(departures) {
  return {
    type: LOAD_DEPARTURES_SUCCESS,
    departures,
  };
}

export function departuresLoadingError(error) {
  return {
    type: LOAD_DEPARTURES_ERROR,
    error,
  };
}
