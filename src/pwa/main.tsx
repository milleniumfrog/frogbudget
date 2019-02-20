
declare const PRODUCTION: boolean;
declare const VERSION: string
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './app';
import './main.scss';
import { logger } from './providers/logger';
import { loadEntries, generateEntriesFromRepeats } from './providers/universal/entries_and_repeats';

logger.log("Start app");
ReactDom.render(<App />, document.getElementById('app'));

// get entriesx f from db and set redux store
(async () => {
	await generateEntriesFromRepeats();
	await loadEntries();
})();

// include serviceworker when building for prod
if(PRODUCTION && 'serviceWorker' in window.navigator) {
	navigator.serviceWorker.register(`sw.js`);
}