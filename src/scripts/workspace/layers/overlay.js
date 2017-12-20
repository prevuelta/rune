// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { POINT_TYPES } from '../../util/constants';
import { GridNodes } from './grid';
import { Arc, Group, Point } from '../components';
import WorkspaceUtil, { Position } from '../workspaceUtil';

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
                mY,
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
        const { unitSize } = this.props.tablet;
        let { offsetX: x, offsetY: y } = e.nativeEvent;
        const { width, height } = Position.tabletSize;
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;

        this.setState({
            mousePosition: {
                x,
                y,
                nX: x / width,
                nY: y / height,
            },
        });
    }

    _onMouseLeave(e) {
        this.setState({ mousePosition: null });
    }

    _clickHandler(e) {
        console.log(e.nativeEvent.offsetX);
    }

    render() {
        let { props } = this;
        let { height, width, points, selectedPoints, mode } = props;
        const { mousePosition } = this.state;
        let x, y;
        if (mousePosition) {
            x = mousePosition.x;
            y = mousePosition.y;
        }

        return (
            <svg
                id="overlay"
                height={height}
                width={width}
                onMouseMove={this._onMouseMove.bind(this)}
                onMouseLeave={this._onMouseLeave.bind(this)}
                onClick={e => this._clickHandler(e)}>
                {mousePosition && (
                    <rect x={x - 5} y={y - 5} width={10} height={10} />
                )}
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
    let points = state.point.all.filter(p => p.rune === ownProps.id);
    let hist = {};
    points.forEach(p => {
        p.path in hist ? hist[p.path].push(p) : (hist[p.path] = [p]);
    });
    let paths = [];
    for (let path in hist) paths.push(hist[path]);
    return {
        mode: state.app.mode,
        ...ownProps,
        pathPoints: paths,
        paths: state.path.all,
        points,
        currentPath: state.path.current,
        selectedPoints: state.point.selected,
        proofView: state.app.proofView,
    };
}

export default connect(mapStateToProps, actionCreators)(Overlay);
