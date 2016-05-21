'use strict';

let React = require('react');
let Events = require('../../global/Events');
let Switch = require('../../components/Switch.jsx');
let Button = require('../../components/Button.jsx');

// Components:
let Cross = require('../../icons/Cross.jsx');
let X = require('../../icons/X.jsx');

let Sheet = React.createClass({
    render: function () {
        return (
            <div className="sheet">
                {this.props.name}
                <span className="toggle">{this.state.collapsed ? '-' : '+'}</span>;
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
})

let Arc = React.createClass({
    getInitialState: function () {
        return {arc: this.props.arc};
    },
    updateArc: function (prop, arc, event) {
        let {value} = event.target;
        if (prop === 'direction') {
            arc.direction = !arc.direction;
        } else if (prop === 'center') {
            if (value.indexOf(',') > -1) {
                value = value.split(',');
            }
            arc.center.x = value[0];
            arc.center.y = value[1];
        } else if (prop === 'size') {
            arc.size = value;
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
                        defaultValue={arc.center.x + ',' + arc.center.y}
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
        return {point: this.props.point, show: false};
    },
    setIsCurve: function (point) {
        point.isCurve = !point.isCurve;
        this.setState({point: point});
        Events.redrawCanvas.dispatch();
    },
    toggle: function () {
        this.state.show = !this.state.show;
        // this.setState();
    },
    componentWillReceiveProps : function (nextProps) {
      this.setState({point: nextProps.point});
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
        // debugger;
        let classNames = this.state.point.isSelected ? 'sheet active' : 'sheet';
        let showHide = this.state.show ? '-' : '+';
        return (
            <div
                className={classNames}
                onClick={this.selectPoint.bind(this, this.state.point)}>
                <span
                    onClick={this.toggle}>
                    [{showHide}]
                </span>
                <small>
                    <span>x: {x.toFixed(2)}, y:{y.toFixed(2)}</span>
                </small>
                <Switch
                    onToggle={this.setIsCurve.bind(this, this.state.point)}
                    toggle={this.state.point.isCurve}
                    symbol="∩">
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
                    <svg viewBox="0,0,220,224.0000000000001" width="220" height="224" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="sans-serif" font-size="12"><path d="M4 56c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8zM0 212c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M156 216c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#f4f4f4" stroke="#ccc" stroke-width="2"/><path d="M204 216c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M0 212c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#27dded" stroke="#000" stroke-width="4"/><path d="M4 8c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z" fill="#f4f4f4" stroke="#ccc" stroke-width="2"/><path d="M12 56c86.156 2.21 154.21 73.844 152 160h48C214.21 103.334 124.666 10.21 12 8z" fill-opacity=".6" fill="#000"/></g></svg>
                </Switch>
                <Button
                    handler={this.deletePoint.bind(this, this.state.point)}>
                    <X />
                </Button>
                { this.state.show ?
                    <div>
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
                    handler={this.addSubPath.bind(this, this.state.path)}>
                    <svg viewBox="0,0,200,200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M0 120V80h80V0h40v80h80v40h-80v80H80v-80" fill-opacity=".6" stroke-miterlimit="10" font-family="sans-serif" font-size="12"/></svg>
                 </Button>
                <Switch onToggle={this.changeHandler} symbol="&">
                   <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M120 0h80v200H0V0h80v40H40v120h120V40h-40" fill-opacity=".6" stroke-miterlimit="10" font-family="sans-serif" font-size="12"/></svg>
                </Switch>
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
                    <div className="sheet">
                        Paths
                        <Button
                            handler={this.addPath.bind(this)}>
                            <Cross />
                        </Button>
                    </div>
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