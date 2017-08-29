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

    constructor (props) {
        super(props);
    }

    componentWillReceiveProps (newProps) {
        console.log("rtoe");
    }

    render () {
        console.log("Paths", this.props.paths)
        return (
            <div>
                <Sheet
                    name="Paths">
                    <Button
                        onClick={() => this.props.addPath()}>
                        <Cross />
                    </Button>
                </Sheet>
                {
                    this.props.paths.map((path, i) => {
                        return <Path path={path} points={this.props.points} key={i}></Path>
                    })
                }
            </div>
        )
    }
}

function Point (props) {
    return (
        <Sheet
            active={props.isSelected}
            onClick={() => props.selectPoint(props.point.id)}>
            <Button>
                <PointIcon />
            </Button>
            <ButtonGroup>
                <Button
                    onClick={() => props.deletePoint(props.point.id)}>
                    <X/>
                </Button>
            </ButtonGroup>
        </Sheet>
    );
}

class Path extends Component {

    constructor (props) {
        super(props);
        console.log("PATH PROPS:", props);
        this.state = {
            collapsed: false
        };
    }

    _selectPath () {
        // TODO: select path 
    }

    _addSubPath () {
        // TODO: add child path
    }

    _deletePath () {
        // TODO: delete path

    }

    _toggleCollapsed () {
        this.setState({
            collapsed: !this.state.collapsed
        });
        console.log("set collapsed", this.state.collapsed);
    }

    render () {
        let { children, id, isActive } = this.props.path;
        let { toggleClosedPath } = this.props;
        let points = this.props.points.filter(p => p.path === id);
        return (
            <div className="path">
                <Sheet
                    active={this.props.path.isActive}>
                    <Button
                        onClick={this._selectPath.bind(this, id)}>
                        <PathIcon/>
                        <div>{" "+points.length}</div>
                    </Button>
                    <ButtonGroup>
                        <Button
                            onClick={this._addSubPath.bind(this, id)}>
                            <Cross />
                        </Button>
                        <Switch onToggle={togglePathClosed}>
                            <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M120 0h80v200H0V0h80v40H40v120h120V40h-40" fillOpacity=".6" strokeMiterlimit="10"/></svg>
                        </Switch>
                        <Button
                            onClick={this._toggleCollapsed.bind(this)}>
                            <Stack/>
                        </Button>
                        <Button
                            onClick={this._deletePath.bind(this)}>
                            <X/>
                        </Button>
                    </ButtonGroup>
                </Sheet>
                { !this.state.collapsed ?
                        points.map((p, i) => <Point key={i} point={p}>{i}</Point> )
                        : null
                }
                {
                    children.map((p) => {
                        return <Path path={p}></Path>;
                    })
                }
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

function mapStateToProps (state) {
    return {
        paths: state.paths.all,
        points: state.points.all,
        selectedPath: state.selectedPath
    };
}

export default connect(mapStateToProps, actionCreators)(PathPanel);
