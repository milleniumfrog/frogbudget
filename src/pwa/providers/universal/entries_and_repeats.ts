import * as EntryDB from '../database/entries';
import * as RepeatDB from '../database/repeats';
import { store } from '../redux/store';
import * as EntryActions from '../redux/actions/entries';
import * as RepeatActions from '../redux/actions/repeats';
import { Repeat } from '../../../types/repeats';
import { Entry } from '../../../types/entry';
import { getID } from '../id';

/**
 * load all entries from database and store them in redux store, 
 * to use the data in the Components
 */
export async function loadEntries() {
	let entries = await EntryDB.getAllEntries();
	store.dispatch(EntryActions.setEntriesActionCreator(entries));
}

export async function loadRepeats() {
	let repeats = await RepeatDB.getAllRepeats();
	store.dispatch(RepeatActions.setRepeatsCreator(repeats));
	return repeats;
}

/**
 * get all Entries in the repeat from beginning until now or an optional end
 * @param repeat 
 */
export async function getEntriesFromRepeat(repeat: Repeat, optEnd?: Date) {
	let beginDate = new Date(repeat.begin);
	let endDate = optEnd || (new Date() < new Date(repeat.end)) ? new Date() : new Date(repeat.end);
	endDate =  new Date(endDate.setDate(endDate.getDate()+1));
	let entries: Entry[] = [];
	while(beginDate < endDate) {
		if(repeat.repeattype === 'weekly') {
			if(repeat.repeats.indexOf(beginDate.getDay()) >= 0)
				entries.push(Object.assign({}, repeat.template, {date: beginDate.toISOString()}))
		}
		else {
			if(repeat.repeats.indexOf(beginDate.getDate()) >= 0)
				entries.push(Object.assign({}, repeat.template, {date: beginDate.toISOString()}))
		}
		beginDate.setDate(beginDate.getDate()+1);
	}
	return entries;
}

/**
 * takes all repeats and generates entries from the repeat template,
 * it stores all new entries in the db 
 */
export async function generateEntriesFromRepeats() {
	let repeats = await loadRepeats();
	// iterate through repeats
	for (const repeat of repeats) {
		// create entries
		let entries = await getEntriesFromRepeat(repeat);
		console.log(entries);
		entries.map((val: Entry) => {
			val.id = getID();
			return val;
		})
		await addEntries(entries);
		// set begin to next day date, so it doesnt create 
		// entries twice
		let newDate = new Date();
		newDate.setDate(newDate.getDate()+1);
		repeat.begin = newDate.toISOString();
		await addRepeat(repeat);
	}
}

/**
 * add an entry to db and the redux store
 * @param entry 
 */
export async function addEntry(entry: Entry) {
	await EntryDB.addEntry(entry);
	store.dispatch(EntryActions.addActionCreator(entry));
}

export async function addEntries(entries: Entry[]) {
	store.dispatch(EntryActions.addEntriesActionCreator(entries));
	for(let entry of entries)
		await EntryDB.addEntry(entry);
}


export async function addRepeat(repeat: Repeat) {
	await RepeatDB.addRepeat(repeat);
}