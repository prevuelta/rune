'use strict';

import { createStore } from 'redux';

import reducer from './reducers/reducer';

const store = createStore(reducer, {todos: [{text: "thing"}]});

export default store;