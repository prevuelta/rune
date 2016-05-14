'use strict';

let React = require('react');
let Events = require('../../global/Events');
let Switch = require('../../components/Switch.jsx');
let Button = require('../../components/Button.jsx');

let Arc = React.createClass({
    getInitialState: function () {
        return {arc: this.props.arc};
    },
    updateArc: function (prop, arc, event) {
        if (prop !== 'direction') {
            let {value} = event.target;
            if (value.indexOf(',') > -1) {
                value = value.split(',');
            }
            arc[prop] = value;
        } else {
            arc.direction = !arc.direction;
        }
        this.setState({arc: arc});
        Events.redrawCanvas.dispatch();
    },
    render: function () {
        let arc = this.state.arc;
        let directionSymbol = this.state.arc.direction ? "⤿" : "⤾";
        return  <div>
                    Arc<br/>
                    Size: <strong>π/</strong>
                    <input
                        type="text"
                        defaultValue={arc.size}
                        onChange={this.updateArc.bind(this, 'size', arc)}
                        />
                    Center
                    <input
                        type="text"
                        defaultValue={arc.center.join(',')}
                        onChange={this.updateArc.bind(this, 'center', arc)}
                       />
                    <Button
                        handler={this.updateArc.bind(this, 'direction', arc)}
                        symbol={directionSymbol}>
                    </Button>
                </div>
    }
});

let PointData = React.createClass({
    getInitialState: function () {
        return {point: this.props.point};
    },
    setIsCurve: function (point) {
        point.isCurve = !point.isCurve;
        this.setState({point: point});
        Events.redrawCanvas.dispatch();
    },
    toggleActive : function () {
        Events.selectPoint.dispatch(this.state.point);
        this.setState({point: this.state.point});
    },
    componentWillReceiveProps : function (nextProps) {
      return nextProps;
    },
    changeHandle: function (ref, event) {
        let coords = event.target.value.split(',');
        let p = this.state.point;
        p[ref] = coords.length === 2 ? coords.map(c => +c) : null;
        this.setState({point: p});
        Events.redrawCanvas.dispatch();
    },
    deletePoint: (point) => {
        Events.deletePoint.dispatch(point);
    },
    toggleArcIn: function () {
        this.state.point.setArcIn();
        Events.redrawCanvas.dispatch();
    },
    toggleArcOut: function () {
        this.state.point.setArcOut();
        Events.redrawCanvas.dispatch();
    },
    selectPoint: (point) => {
        Events.selectPoint.dispatch(point);
    },
    render: function() {
        let x = this.props.point.x;
        let y = this.props.point.y;
        let classNames = this.state.point.isSelected ? 'sheet active' : 'sheet';
        return (
            <div
                className={classNames}
                onClick={this.selectPoint.bind(this, this.state.point)}>
                <span
                    onClick={this.toggleActive}>
                    [&#8226;]
                </span>
                <small>
                    <span>x: {x}, y:{y}</span>
                </small>
                {this.state.point.transforms}
                <Switch
                    onToggle={this.setIsCurve.bind(this, this.state.point)}
                    toggle={this.state.point.isCurve}
                    symbol="S">
                </Switch>
                <Switch
                    onToggle={this.toggleArcIn}
                    toggle={this.state.point.hasArcIn}
                    symbol="╭">
                </Switch>
                <Switch
                    onToggle={this.toggleArcOut}
                    toggle={this.state.point.hasArcOut}
                    symbol="╮">
                </Switch>
                <Button
                    handler={this.deletePoint.bind(this, this.state.point)}
                    symbol="X">
                </Button>
                {
                    this.state.point.isCurve ?
                        <div>
                            Handles<br/>
                            <input
                                type="text"
                                defaultValue={this.state.point.handle1}
                                onChange={this.changeHandle.bind(this, 'handle1')} />
                            <input
                                type="text"
                                defaultValue={this.state.point.handle2}
                                onChange={this.changeHandle.bind(this, 'handle2')} />
                        </div>
                    : null
                }
                {
                    this.state.point.hasArcIn ?
                        <Arc arc={this.state.point.arcIn}></Arc>
                    : null
                }
                {   
                    this.state.point.hasArcOut ?
                        <Arc arc={this.state.point.arcOut}></Arc>
                    : null
                }
            </div>
        );
    }
});

let Path = React.createClass({
    getInitialState: function () {
        return {path: this.props.path};
    },
    changeHandler: function () {
        this.state.path.isClosed = !this.state.path.isClosed;
        this.setState({path: this.state.path});
        Events.redrawCanvas.dispatch();
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({path :nextProps.path });
        return nextProps;
    },
    selectPath : function (path) {
        if (!this.state.path.isActive) {
            Events.selectPath.dispatch(path);
        }
    },
    addSubPath: (path) => {
        Events.addSubPath.dispatch(path);
    },
    render: function () {
        let classNames = this.state.path.isActive ? 'sheet active' : 'sheet';
        return (
            <div className={classNames}>
                <span onClick={this.selectPath.bind(this, this.state.path)}>
                    <strong>
                        Path
                    </strong>
                </span>
                <Button
                    handler={this.addSubPath.bind(this, this.state.path)}
                    symbol="+S">
                </Button>
                <Switch onToggle={this.changeHandler} symbol="&"></Switch>
                {
                    this.state.path.hasChildren ?
                        this.state.path.children.map((p) => {
                            return <Path path={p}></Path>;
                        })
                    : null
                }
                { this.state.path.points.map((p) => <PointData point={p}></PointData> ) }
            </div>
        );
    }
});

module.exports = {
    title: 'Inspect path',
    collapsed: false,
    panel: React.createClass({
        getInitialState: function () {
            return {paths: this.props.data.activeRune.paths};
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                paths: nextProps.data.activeRune.paths
            });
        },
        addPath: () => {
            Events.addPath.dispatch();
        },
        render: function() {
            let _this = this;
            return (
                <div>
                    <Button
                        handler={this.addPath.bind(this)}
                        symbol="+P">
                    </Button>
                    {
                        this.state.paths.map((path) => {
                            return <Path path={path}></Path>
                        })
                    }
                </div>
            );
        }
    })
};