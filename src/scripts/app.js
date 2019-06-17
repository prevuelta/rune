'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Workspace from './workspace';
import { Provider } from 'react-redux';

import Store from './data/store';

import './util/keys';

const render = () => {
    ReactDOM.render(
        <Provider store={Store}>
            <Workspace />
        </Provider>,
        document.getElementById('app')
    );
};

render();

Store.subscribe(render);
