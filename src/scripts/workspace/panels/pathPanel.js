'use strict';

import * as actionCreators from '../../actions/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components:
import Switch from '../components/switch';
import Sheet from '../components/sheet';
import Button from '../components/button';
import ButtonGroup from '../components/buttonGroup';
import Cross from '../icons/cross';
import X from '../icons/x';
import Stack from '../icons/stack';
import PointIcon from '../icons/point';
import PathIcon from '../icons/path';

class PathPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            togglePathClosed,
            addPoint,
            selectPoint,
            deletePoint,
            point,
        } = this.props;
        return (
            <div>
                <Sheet name="Paths">
                    <Button onClick={() => this.props.addPath()}>
                        <Cross />
                    </Button>
                </Sheet>
                {this.props.paths.map((path, i) => {
                    let points = this.props.points.filter(
                        p => path.id === p.path,
                    );
                    return (
                        <Path
                            key={i}
                            path={path}
                            points={points}
                            togglePathClosed={togglePathClosed.bind(
                                null,
                                path.id,
                            )}
                            addPoint={addPoint}
                            deletePoint={deletePoint}
                            selectPoint={selectPoint}
                        />
                    );
                })}
            </div>
        );
    }
}

function Point(props) {
    console.log(props);
    const { x, y, id } = props.point;
    return (
        <Sheet
            active={props.isSelected}
            onClick={e => props.selectPoint(e, id)}>
            <Button>
                <PointIcon />
            </Button>
            <p>
                {x}x{y}
            </p>
            <ButtonGroup>
                <Button onClick={e => props.deletePoint(e, id)}>
                    <X />
                </Button>
            </ButtonGroup>
        </Sheet>
    );
}

class Path extends Component {
    constructor(props) {
        super(props);
        console.log('PATH PROPS:', props);
        this.state = {
            collapsed: false,
        };
    }

    _selectPath() {
        // TODO: select path
    }

    _addSubPath() {
        // TODO: add child path
    }

    _deletePath() {
        // TODO: delete path
    }

    _toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
        console.log('set collapsed', this.state.collapsed);
    }

    render() {
        let { children, id, isActive } = this.props.path;
        let { points, togglePathClosed, selectPoint, deletePoint } = this.props;
        return (
            <div className="path">
                <Sheet active={this.props.path.isActive}>
                    <Button onClick={this._selectPath.bind(this, id)}>
                        <PathIcon />
                        <div>{' ' + points.length}</div>
                    </Button>
                    <ButtonGroup>
                        <Button onClick={this._addSubPath.bind(this, id)}>
                            <Cross />
                        </Button>
                        <Switch onToggle={togglePathClosed}>
                            <svg
                                viewBox="0 0 200 200"
                                width="200"
                                height="200"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M120 0h80v200H0V0h80v40H40v120h120V40h-40"
                                    fillOpacity=".6"
                                    strokeMiterlimit="10"
                                />
                            </svg>
                        </Switch>
                        <Button onClick={this._toggleCollapsed.bind(this)}>
                            <Stack />
                        </Button>
                        <Button onClick={this._deletePath.bind(this)}>
                            <X />
                        </Button>
                    </ButtonGroup>
                </Sheet>
                {!this.state.collapsed
                    ? points.map((p, i) => (
                          <Point
                              selectPoint={selectPoint}
                              deletePoint={deletePoint}
                              key={i}
                              point={p}>
                              {i}
                          </Point>
                      ))
                    : null}
                {children.map(p => {
                    return <Path path={p} />;
                })}
            </div>
        );
    }
}

// let Path = React.createClass({
//     getInitialState: function () {
//         return {path: this.props.path};
//     },
//     changeHandler: function () {
//         this.state.path.isClosed = !this.state.path.isClosed;
//         this.setState({path: this.state.path, collapsed: false});
//         Events.redrawView.dispatch();
//     },
//     componentWillReceiveProps : function (nextProps) {
//         this.setState({path :nextProps.path });
//         return nextProps;
//     },
//     selectPath : function (path) {
//         console.log("should not be firung");
//         if (!this.state.path.isActive) {
//             Events.selectPath.dispatch(path);
//         }
//     },
//     deletePath: function (path) {
//         Events.deletePath.dispatch(path);
//     },
//     addSubPath: (path) => {
//         console.log("should be");
//         Events.addSubPath.dispatch(path);
//     },
//     toggleCollapsed: function () {
//         this.setState({collapsed: !this.state.collapsed});
//     },
//     render: function () {
//         return (
//             <div className="path">
//         );
//     }
// });

function mapStateToProps(state) {
    return {
        paths: state.path.all,
        points: state.point.all,
        selectedPath: state.selectedPath,
    };
}

export default connect(mapStateToProps, actionCreators)(PathPanel);
