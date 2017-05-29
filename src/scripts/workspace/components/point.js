'use strict';

import React from 'react';
import { COLORS } from '../../util/constants';

export default function Point (props) {
    console.log("POINT PROPS:", props);
    return <circle cx={props.x} cy={props.y} r={8} fill={'white'} stroke={COLORS.BLUE} strokeWidth={2} />
}
