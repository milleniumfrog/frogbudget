import * as Redux from 'redux';
import { entryReducer } from './reducers/entry';
import { repeatsReducer } from './reducers/repeats';

export let store = Redux.createStore(Redux.combineReducers({entryReducer, generatorReducer: repeatsReducer}))