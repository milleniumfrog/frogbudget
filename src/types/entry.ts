import { Repeat } from "./repeats";

export interface Entry {
	value: number;
	/** Date Isostring */
	date: string;
	note: string;
	/** unique id: */
	id: string;
	category: string;
}
