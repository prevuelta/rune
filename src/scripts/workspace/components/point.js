'use strict';

import React from 'react';
import * as actionCreators from '../../actions/actions';
import { connect } from 'react-redux';
import { COLORS } from '../../util/constants';

function Point (props) {
    return <circle
                onClick={e => props.selectPoint(e, props.index)}
                cx={`${props.x*100}%`}
                cy={`${props.y*100}%`}
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
