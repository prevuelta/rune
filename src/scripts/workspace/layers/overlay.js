// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { POINT_TYPES } from '../../util/constants';
import { GridNodes } from './grid';
import { Arc, Group, Point } from '../components';
import WorkspaceUtil from '../workspaceUtil';

const pointStrings = {
    [POINT_TYPES.STRAIGHT]: (mX, mY) => `L ${mX} ${mY}`,
    [POINT_TYPES.ARC]: (mX, mY) => `A 50 50 0 0 1 ${mX} ${mY}`,
};

function Helpers(props) {
    let { mousePosition, point, width, height, tablet: { gridUnit } } = props;

    let mX = (mousePosition && mousePosition.x) || 0;
    let mY = (mousePosition && mousePosition.y) || 0;

    // mX = (Math.round(mX * width / gridUnit) * gridUnit );
    // mY = (Math.round(mY * height / gridUnit) * gridUnit );
    mX = Math.round(mX / gridUnit) * gridUnit;
    mY = Math.round(mY / gridUnit) * gridUnit;

    let pX = point.x * width;
    let pY = point.y * height;

    let str = '';
    if (props.mousePosition) {
        if (WorkspaceUtil.isDrawingMode) {
            str = `M ${pX} ${pY} ${pointStrings[point.type](mX, mY)}`;
        } else if (WorkspaceUtil.isArcMode) {
            str = `M ${pX} ${pY} a ${100} ${100} ${pointStrings[point.type](
                mX,
                mY
            )}`;
        }
    }

    let stroke = 'red';

    return (
        <svg>
            <path stroke={stroke} fill="none" pointerEvents="none" d={str} />
        </svg>
    );
}

// UI
class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mousePosition: { x: 0, y: 0 },
        };
    }

    _onMouseMove(e, data) {
        this.setState({
            mousePosition: {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
            },
        });
    }

    _onMouseLeave(e) {
        this.setState({ mousePosition: null });
    }

    render() {
        let { props } = this;
        let { height, width, points, selectedPoints, mode } = props;

        return (
            <svg
                id="overlay"
                height={height}
                width={width}
                onMouseMove={this._onMouseMove.bind(this)}
                onMouseLeave={this._onMouseLeave.bind(this)}>
                <GridNodes {...props} />
                <Arc mousePosition={this.state.mousePosition} />
                {points.map((p, i) => (
                    <Point
                        index={i}
                        selected={selectedPoints.indexOf(i) > -1}
                        onClick={e => props.selectPoint(e, i)}
                        key={i}
                        {...p}
                    />
                ))}
                {selectedPoints.length && (
                    <Helpers
                        {...props}
                        mode={mode}
                        mousePosition={this.state.mousePosition}
                        point={points[selectedPoints[0]] || { x: 0, y: 0 }}
                    />
                )}
            </svg>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        mode: state.app.mode,
        ...ownProps,
    };
}

export default connect(mapStateToProps, actionCreators)(Overlay);
