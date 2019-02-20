import * as localforage from 'localforage';
import { Repeat } from '../../../types/repeats';
import { dblogger } from '../logger';

const repeatsDb = localforage.createInstance({ name: 'repeat' });

export async function addRepeat(repeat: Repeat): Promise<Repeat> {
	dblogger.log('add Repeat')
	await repeatsDb.setItem(repeat.id, repeat);
	return repeat;
}

export async function removeRepeat(repeat: Repeat): Promise<Repeat> {
	dblogger.log('remove repeat ' + repeat.id);
	await repeatsDb.removeItem(repeat.id);
	return repeat;
}

export async function getAllRepeats() {
	dblogger.log('get all repeats');
	let allRepeats: Repeat[] = [];
	await repeatsDb.iterate((repeat: Repeat) => {
		allRepeats.push(repeat);
	})
	return allRepeats;
}