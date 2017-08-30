'use strict';

import { createStore, applyMiddleware } from 'redux';

/* Reducer is passed an action and returns modified state */
import reducer from './reducers/reducer';

import Tablet from '../data/models/tablet';

import { pointResize } from '../middleware';

/* Remember: store is pure data */
const store = createStore(
    reducer,
    applyMiddleware(pointResize)
);

export default store;
