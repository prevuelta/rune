'use strict';

import React, {Component} from 'react';
import * as actionCreators from '../../../actions/actions';
import {connect} from 'react-redux';
import {COLORS} from '../../../util/constants';

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
        };
    }

    render() {
        const {props} = this;
        return (
            <circle
                cx={`${props.x * 100}%`}
                cy={`${props.y * 100}%`}
                r={8}
                fill={'white'}
                stroke={props.selected ? COLORS.RED : COLORS.BLUE}
                strokeWidth={2}
                onMouseDown={e => props.onMouseDown && props.onMouseDown(e)}
                onClick={e => props.onClick && props.onClick(e)}
            />
        );
    }
}

export default Point;
