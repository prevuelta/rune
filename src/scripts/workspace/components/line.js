'use strict';

import React from 'react';


export function Line (props) {
    return (
        <line {...props} strokeWidth="1" pointerEvents="none"/>
    );
};

export function Vline (props) {
    let {x, opacity, length, color} = props;
    return (
        <line x1={x} y1={0} x2={x} y2={length} strokeOpacity={opacity} stroke={color} strokeWidth="1" pointerEvents="none" />
    );
}

export function Hline (props) {
    let {y, opacity, length, color} = props;
    return (
        <line x1={0} y1={y} x2={length} y2={y} strokeOpacity={opacity} stroke={color} strokeWidth="1" pointerEvents="none" />
    );
}
