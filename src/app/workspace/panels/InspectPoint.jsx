'use strict';

let React = require('react');
let Events = require('../../global/Events');

// Components
let Sheet = require('../../components/Sheet.jsx');
let Switch = require('../../components/Switch.jsx');
let Button = require('../../components/Button.jsx');
let ButtonGroup = require('../../components/ButtonGroup.jsx');
let XYInput = require('../../components/XYInput.jsx');

// Icons:
let ArcInIcon = require('../../icons/ArcIn.jsx');
let ArcOutIcon = require('../../icons/ArcOut.jsx');
let CurveIcon = require('../../icons/Curve.jsx');

let Handle = React.createClass({
    getInitialState: function () {
        return {handle: this.props.handle};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            handle: nextProps.handle
        });
    },
    changeHandle: function (event) {
        let coords = event.target.value.split(',');
        if (coords.length === 2) {
            this.props.onUpdate(coords.map(c => +c));
        }
        // this.setState({handle: this.state.handle});
        // Events.redrawView.dispatch();
    },
    render: function () {
        return (
            <div>
                <input
                    type="text"
                    defaultValue={this.state.handle ? this.state.handle.join(',') : null}
                    onChange={this.changeHandle} />
            </div>
        );
    }
});

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
            arc.center.x = +value[0];
            arc.center.y = +value[1];
        } else if (prop === 'size') {
            arc.size = value;
        }
        this.setState({arc: arc});
        Events.redrawView.dispatch();
    },
    updateCenter: function (val) {
        console.log("Arc center", val);
        this.state.arc.center = val;
        this.setState({arc: this.state.arc});
        Events.redrawView.dispatch();
    },
    render: function () {
        let arc = this.state.arc;
        let directionSymbol = this.state.arc.direction ? "⤿" : "⤾";
        return  <div>
                    Size: <strong>π/</strong>
                    <input
                        type="text"
                        defaultValue={arc.size}
                        onChange={this.updateArc.bind(this, 'size', arc)}
                        />
                    <XYInput
                        change={this.updateCenter}
                        value={this.state.arc.center}
                        label="Center" />
                    <Button
                        handler={this.updateArc.bind(this, 'direction', arc)}
                        symbol={directionSymbol}>
                    </Button>
                </div>
    }
});

module.exports = {
    title: 'Inspect point',
    collapsed: false,
    panel: React.createClass({
        getInitialState: function () {
            return {point: this.props.data.activeRune.selectedPoint};
        },
        setIsCurve: function (point) {
            point.toggleCurve();
            this.setState({point: point});
            Events.redrawView.dispatch();
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                point: nextProps.data.activeRune.selectedPoint
            });
        },
        toggleArcIn: function () {
            this.state.point.setArcIn();
            this.setState({point: this.state.point});
            Events.redrawView.dispatch();
        },
        toggleArcOut: function () {
            this.state.point.setArcOut();
            this.setState({point: this.state.point});
            Events.redrawView.dispatch();
        },
        toggleTangent: function () {
            this.state.point.setTangent();
            this.setState({point: this.state.point});
            Events.redrawView.dispatch();
        },
        updateHandleIn: function (val) {
            this.state.point.handleIn = val;
            this.setState({point: this.state.point});
            Events.redrawView.dispatch();
        },
        updateHandleOut: function (val) {
            this.state.point.handleOut = val;
            this.setState({point: this.state.point});
            Events.redrawView.dispatch();
        },
        render: function() {
            if (this.state.point) {
                let _this = this;
                let x = this.state.point.x;
                let y = this.state.point.y;
                return (
                    <div>
                        <div className="pane">
                            <div className="coord">
                                <span>X: <em>{x.toFixed(2)}</em></span>
                                <span>Y: <em>{y.toFixed(2)}</em></span>
                            </div>
                            <ButtonGroup>
                                <Switch
                                    onToggle={this.setIsCurve.bind(this, this.state.point)}
                                    toggle={this.state.point.isCurve}>
                                    <CurveIcon />
                                </Switch>
                                <Switch
                                    onToggle={this.toggleArcIn}
                                    toggle={this.state.point.hasArcIn}
                                    >
                                    <ArcInIcon />
                                </Switch>
                                <Switch
                                    onToggle={this.toggleArcOut}
                                    toggle={this.state.point.hasArcOut}>
                                    <ArcOutIcon />
                                </Switch>
                                <Switch
                                    onToggle={this.toggleTangent}
                                    toggle={this.state.point.hasTangent}>
                                    <CurveIcon />
                                </Switch>
                            </ButtonGroup>
                        </div>
                        <div className="pane">
                            <div>
                                {
                                    this.state.point.isCurve ?
                                        <div>
                                            <Handle handle={this.state.point.handleIn} onUpdate={this.updateHandleIn}/>
                                            <Handle handle={this.state.point.handleOut} onUpdate={this.updateHandleOut} />
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
                        </div>
                    </div>
                );
            } else {
                return null;
            }
        }
    })
};