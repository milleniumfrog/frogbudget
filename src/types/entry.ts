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


export const defaultEntry = {
	value: 0,
	date: new Date().toISOString(),
	note: '',
	id: '-1',
	category: 'default'
}