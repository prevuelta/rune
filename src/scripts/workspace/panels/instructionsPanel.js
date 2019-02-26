'use strict';

import React, { Component } from 'react';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { COLORS, POINT_TYPES } from '../../util/constants';

class Path extends Component {
    constructor(props) {
        super(props);
        const { path } = props;

        this.props.addPoint({
            x: 0,
            y: 0,
            path: path._id,
            type: POINT_TYPES.STRAIGHT,
        });
        this.state = {};
    }

    _handleKeyPress = e => {
        console.log(e.keyCode);
        if (e.keyCode) {
        }
    };

    render() {
        return (
            <div
                className="editable path"
                onKeyPress={this._handleKeyPress}
                contentEditable>
                P
            </div>
        );
    }
}

class Point extends Component {
    state = {};

    _handleKeyPress = e => {
        const { path, point } = this.props;
        if (e.nativeEvent.keyCode === 13) {
            this.props.addPoint({
                x: 0,
                y: 0,
                path: path._id,
                type: POINT_TYPES.STRAIGHT,
            });
            // var evt = new KeyboardEvent('keydown', {'keyCode':65gt, 'which':65};
            // document.dispatchEvent (evt);

            e.preventDefault();
        }
    };

    _handleInput = e => {
        const val = e.target.innerHTML;
        const xy = val.split(',');
        this.props.updatePoint(this.props.point._id, { x: xy[0], y: xy[1] });
    };

    render() {
        const { x, y } = this.props.point;
        return (
            <div
                className="editable point"
                onKeyPress={this._handleKeyPress}
                onInput={this._handleInput}
                suppressContentEditableWarning={true}
                contentEditable>
                {x},{y}
            </div>
        );
    }
}
const PathConnected = connect(null, actionCreators)(Path);
const PointConnected = connect(null, actionCreators)(Point);

class PathEditor extends Component {
    constructor(props) {
        super(props);
        this.pointRefs = props.points.map(p => React.createRef());

        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.pointRefs = newProps.points.map(p => React.createRef());
    }

    _onUpdate = e => {
        // this.props.sendInstructions(e.target.value);
    };

    _handleKeyPress = e => {
        if (e.nativeEvent.keyCode === 13) {
            // this.pointRefs[
        }
    };

    render() {
        const { paths, points } = this.props;
        console.log(this.props);
        return (
            <div className="paths">
                {paths.map(p => {
                    return [
                        <PathConnected path={p} key={p._id} />,
                        ...points
                            .filter(point => point.path === p._id)
                            .map((point, i) => (
                                <PointConnected
                                    ref={this.pointRefs[i]}
                                    point={point}
                                    path={p}
                                />
                            )),
                    ];
                })}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { paths: state.paths.all, points: state.points.all };
}

export default connect(mapStateToProps, actionCreators)(PathEditor);
