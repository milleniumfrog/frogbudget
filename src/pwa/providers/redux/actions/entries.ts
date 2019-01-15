import { Entry } from "../../../../types/entry";
import { Action } from 'redux';
export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const SET_ENTRIES = 'SET_ENTRIES';

export function addActionCreator(entry: Entry): Action & {entry: Entry} {
	return {
		type: ADD,
		entry
	}
}

export function removeActionCreator(entry: Entry): Action & {entry: Entry} {
	return {
		type: REMOVE,
		entry
	}
}

export function setentriesActionCreator(entries: Entry[]): Action & {entries: Entry[]} {
	return {
		type: SET_ENTRIES,
		entries
	}
}