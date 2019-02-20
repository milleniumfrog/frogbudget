import { Repeat } from "../../../../types/repeats";
import { Action } from "redux";
import { reduxlogger } from "../../logger";


export const ADD = 'ADD_REPEAT';
export const REMOVE = 'REMOVE_REPEAT';
export const SET = 'SET_REPEATS'

export function addActionCreator(repeat: Repeat): Action & {repeat: Repeat} {
	reduxlogger.log('create add action');
	return {
		type: ADD,
		repeat,
	}
}

export function removeActionCreator(repeat: Repeat): Action & {repeat: Repeat} {
	reduxlogger.log('create remove action');
	return {
		type: REMOVE,
		repeat,
	}
}

export function setRepeatsCreator(repeats: Repeat[]): Action & {repeats: Repeat[]} {
	reduxlogger.log('create setentries action');
	return {
		type: SET,
		repeats,
	}
}