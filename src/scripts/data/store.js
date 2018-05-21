import { createStore, applyMiddleware } from 'redux';

/* Reducer is passed an action and returns modified state */
import { rootReducer } from './reducers';
import { pointResize } from '../middleware';

/* Remember: store is pure data */
const store = createStore(rootReducer, applyMiddleware(pointResize));
console.log(store.getState());

export default store;
