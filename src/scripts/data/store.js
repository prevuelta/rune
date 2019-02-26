'use strict';

import { createStore, applyMiddleware } from 'redux';

/* Reducer is passed an action and returns modified state */
import { rootReducer } from './reducers';
import { pointResize, instructionParser } from '../middleware';
import { TabletModel, RuneModel, PathModel } from './models';
import { MODE } from '../util/constants';

const initialAppState = {
    proofView: false,
    mode: MODE.DOCUMENT,
    snap: true,
};

const rune = RuneModel();
const path = PathModel({ rune: rune._id });

const initialState = {
    runes: {
        all: { [rune._id]: rune },
        current: rune._id,
    },
    paths: {
        all: [path],
        current: path._id,
    },
    app: initialAppState,
};
/* Remember: store is pure data */
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(pointResize, instructionParser)
);
console.log('Initial store', store.getState());

export default store;
