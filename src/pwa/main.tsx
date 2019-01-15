
declare const PRODUCTION: boolean;
declare const VERSION: string
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './app';
import { getAllEntries } from './providers/database/entries';
import { Entry } from '../types/entry';
import { setentriesActionCreator } from './providers/redux/actions/entries';
import { store } from './providers/redux/store';

ReactDom.render(<App />, document.getElementById('app'));

// get entries from db and set redux store
(async () => {
	let entries: Entry[] = await getAllEntries();
	store.dispatch(setentriesActionCreator(entries));
})();

if(PRODUCTION && 'serviceWorker' in window.navigator) {
	navigator.serviceWorker.register(`sw.js`);
}