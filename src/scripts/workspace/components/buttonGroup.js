'use strict';

import React from 'react';

export default function (props) {
    return (
        <div
            className="button-group">
            { props.children }
        </div>
    );
}
