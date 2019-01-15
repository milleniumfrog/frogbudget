import * as Redux from 'redux';
import { entryReducer } from './reducers/entry';

export let store = Redux.createStore(entryReducer)