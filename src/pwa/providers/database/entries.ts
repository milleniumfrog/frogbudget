import * as localforage from 'localforage';
import { Entry } from '../../../types/entry';
import { dblogger } from '../logger';

const entryDb = localforage.createInstance({ name: 'entry' });

export async function addEntry(entry: Entry): Promise<Entry> {
	dblogger.log("add entry")
	await entryDb.setItem(entry.id, entry);
	return entry;
}

export async function removeEntry(entry: Entry): Promise<Entry> {
	await dblogger.log("remove an entry")
	await entryDb.removeItem(entry.id);
	return entry;
}

export async function getAllEntries() {
	dblogger.log("get all entries")
	let sortedArr: Entry[] = [];
	// add data unsorted
	await entryDb.iterate((entry: Entry) => {
		sortedArr.push(entry);
	})
	// sort data
	sortedArr.sort((a: Entry, b: Entry) => {
		const aDate = new Date(a.date);
		const bDate = new Date(b.date);
		return bDate.getTime() - aDate.getTime();
	})
	return sortedArr;
}