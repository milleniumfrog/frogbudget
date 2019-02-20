import { Entry } from "../../../../types/entry";
import { Action } from 'redux';
import { reduxlogger } from "../../logger";

export const ADD = 'ADD_ENTRY';
export const REMOVE = 'REMOVE_ENTRY';
export const SET = 'SET_ENTRIES';
export const ADD_ENTRIES = 'ADD_ENTRIES';

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

export function setEntriesActionCreator(entries: Entry[]): Action & {entries: Entry[]} {
	reduxlogger.log("create setentries action");
	return {
		type: SET,
		entries
	}
}

export function addEntriesActionCreator(entries: Entry[]): Action & {entries: Entry[]} {
	reduxlogger.log("create setentries action");
	return {
		type: ADD_ENTRIES,
		entries
	}
}