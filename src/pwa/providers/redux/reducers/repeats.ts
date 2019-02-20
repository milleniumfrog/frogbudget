import { Entry } from "../../../../types/entry";
import { Action } from "redux";
import { reduxlogger } from "../../logger";

export function repeatsReducer(state: Entry[] = [], action: Action & {entries?: Entry[], entry?: Entry}) {
	reduxlogger.log("call repeat-reducer with action " + action.type);
	return state;
}