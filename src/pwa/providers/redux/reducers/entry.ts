import { Entry } from "../../../../types/entry";
import { Action } from "redux";
import { ADD, REMOVE, SET_ENTRIES } from "../actions/entries";

export function entryReducer(state: Entry[] = [], action: Action & {entries?: Entry[], entry?: Entry}) {
	switch(action.type) {
		case ADD:
			if(!action.entry)
				throw new Error('tries to add an empty entry');
			state = [...state];
			state.push(action.entry);
			state.sort((a: Entry, b: Entry) => {
				const aDate = new Date(a.date);
				const bDate = new Date(b.date);
				return bDate.getTime() - aDate.getTime();
			})
			return state;
		case REMOVE: 
			if(!action.entry)
				throw new Error('tries to remove an empty entry');
			let entr: Entry = action.entry
			let u = state.filter((val) => {
				return val.id !== (<Entry>action.entry).id;
			})
			return u;
		case SET_ENTRIES:
			if(!action.entries) 
				throw new Error('tries to set the state to null|undefined');
			return action.entries;
	}
	return state;
}