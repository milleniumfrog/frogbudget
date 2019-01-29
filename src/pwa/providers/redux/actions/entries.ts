import { Entry } from "../../../../types/entry";
import { Action } from 'redux';
import { reduxlogger } from "../../logger";
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const SET_ENTRIES = 'SET_ENTRIES';

export function addActionCreator(entry: Entry): Action & {entry: Entry} {
	reduxlogger.log("create add action");
	return {
		type: ADD,
		entry
	}
}

export function removeActionCreator(entry: Entry): Action & {entry: Entry} {
	reduxlogger.log("create remove action");
	return {
		type: REMOVE,
		entry
	}
}

export function setentriesActionCreator(entries: Entry[]): Action & {entries: Entry[]} {
	reduxlogger.log("create setentries action");
	return {
		type: SET_ENTRIES,
		entries
	}
}