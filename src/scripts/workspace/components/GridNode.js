'use strict';

import React from 'react';
import Line from './line';
import Group from './group';
//import Styles = from '../../util/styles';
import { COLORS } from '../../util/constants';

export default function GridNode (props) {
    let {location, clickHandler} = props;
    return (
        <circle cx={location[0]} cy={location[1]} r={10} fill={"red"} onClick={clickHandler} />
    );
}
