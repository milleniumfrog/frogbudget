import { Entry } from "../../../../types/entry";

export function mapStateToProps(state: Entry[]) {
	return {
		entries: state,
	}
}