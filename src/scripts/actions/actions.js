'use strict';

export function addPoint (point) {
    return {
        type: 'ADD_POINT',
        point
    };
};

export function selectPoint (index) {
    return {
        type: 'SELECT_POINT',
        index
    };
};
