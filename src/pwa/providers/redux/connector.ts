import { Entry } from "../../../types/entry";
import { repeatsReducer } from "./reducers/repeats";

export function mapStateToProps(state: {entryReducer: Entry[], repeatsReducer: Generator[]}) {
	return {
		entries: state.entryReducer,
		repeats: state.repeatsReducer,
	}
}