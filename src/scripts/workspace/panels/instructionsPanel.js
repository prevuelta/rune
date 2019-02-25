'use strict';

import React, { Component } from 'react';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { COLORS, POINT_TYPES } from '../../util/constants';

const lineItem = props => {};

class InstructionLine extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.props.addPoint({
            x: 0,
            y: 0,
            path: props.currentPath,
            rune: props.rune,
            type: POINT_TYPES.STRAIGHT,
        });
        this.state = {};
    }

    _handleKeyPress = e => {
        if (e.keyCode) {
        }
    };

    render() {
        return (
            <li
                className="instruction"
                onKeyPress={this._handleKeyPress}
                contentEditable>
                {this.props.i}
            </li>
        );
    }
}
const InstructionLineConnected = connect(null, actionCreators)(InstructionLine);

class PathEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    _onUpdate = e => {
        this.props.sendInstructions(e.target.value);
    };

    render() {
        const { instructions } = this.props;
        return (
            <ul className="instruction-list">
                {instructions.map(i => {
                    return <InstructionLineConnected i={i} />;
                })}
            </ul>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        instructions: [
            {
                x: 0,
                y: 0,
            },
        ],
    };
}

export default connect(mapStateToProps, actionCreators)(PathEditor);
