import { Entry } from "./entry";

export interface Repeat {
	/** Date Isostring */
	begin: string;
	/** Date Isostring */
	end: string;
	/** unique id */
	id: string;
	/** template for creating Entries with other dates */
	template: Entry;
	repeattype: 'weekly' | 'monthly';
	repeats: number[];
}