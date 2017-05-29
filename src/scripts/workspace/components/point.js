'use strict';

import React from 'react';
import * as actionCreators from '../../actions/actions';
import { connect } from 'react-redux';
import { COLORS } from '../../util/constants';

function Point (props) {
    return <circle
                onClick={() => props.selectPoint(props.index)}
                cx={props.x}
                cy={props.y}
                r={8}
                fill={'white'}
                stroke={props.selected ? COLORS.RED : COLORS.BLUE}
                strokeWidth={2}
            />
}

function mapStateToProps (state, ownProps) {
    return ownProps;
}

export default connect(mapStateToProps, actionCreators)(Point);
