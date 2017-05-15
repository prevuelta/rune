'use strict';

import { createStore } from 'redux';

/* Reducer is passed an action and returns modified state */
import reducer from './reducers/reducer';

import Tablet from '../data/models/tablet';

let initialState = {tablets: [ Tablet() ]};

/* Remember: store is pure data */
const store = createStore(reducer, initialState);

export default store;
