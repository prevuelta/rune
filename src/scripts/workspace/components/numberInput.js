'use strict';

import React from 'react';

export default function (props) {
    return (
        <div>
            <h3>{props.label}</h3>
            <input
                type="number"
                value={props.value}
                onChange={e => props.onChange(+e.target.value)}
            />
        </div>
    );
}
