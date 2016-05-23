'use strict';

let React = require('react');
let Events = require('../../global/Events');

// Components
let Sheet = require('../../components/Sheet.jsx');
let Switch = require('../../components/Switch.jsx');
let Button = require('../../components/Button.jsx');

let Handle = React.createClass({
    getInitialState: function () {
        return {handle: this.props.handle};
    },
    changeHandle: function (handle, event) {
        let coords = event.target.value.split(',');
        this.state.handle = coords.length === 2 ? coords.map(c => +c) : null;
        this.setState({handle: this.state.handle});
        Events.redrawCanvas.dispatch();
    },
    render: function () {
        return (
            <div>
                <input
                    type="text"
                    defaultValue={this.state.handle}
                    onChange={this.changeHandle.bind(this, this.state.handle)} />
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

// let PointData = React.createClass({
//     getInitialState: function () {
//         return {point: this.props.point, show: false};
//     },
//     setIsCurve: function (point) {
//         point.isCurve = !point.isCurve;
//         this.setState({point: point});
//         Events.redrawCanvas.dispatch();
//     },
//     toggle: function () {
//         this.state.show = !this.state.show;
//         // this.setState();
//     },
//     componentWillReceiveProps : function (nextProps) {
//       this.setState({point: nextProps.point});
//       return nextProps;
//     },

//     deletePoint: (point) => {
//         Events.deletePoint.dispatch(point);
//     },
//     toggleArcIn: function () {
//         this.state.point.setArcIn();
//         Events.redrawCanvas.dispatch();
//     },
//     toggleArcOut: function () {
//         this.state.point.setArcOut();
//         Events.redrawCanvas.dispatch();
//     },
//     selectPoint: (point) => {
//         Events.selectPoint.dispatch(point);
//     },
//     render: function() {
//         let x = this.props.point.x;
//         let y = this.props.point.y;
//         // debugger;
//         let classNames = this.state.point.isSelected ? 'sheet active' : 'sheet';
//         let showHide = this.state.show ? '-' : '+';
//         return (
//             <Sheet
//                 active={this.state.point.isSelected}
//                 name={}>
//             </Sheet>
//     }
// });

module.exports = {
    title: 'Inspect point',
    collapsed: false,
    panel: React.createClass({
        getInitialState: function () {
            return {point: this.props.data.activeRune.selectedPoint};
        },
        setIsCurve: function (point) {
            point.isCurve = !point.isCurve;
            this.setState({point: point});
            Events.redrawCanvas.dispatch();
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                point: nextProps.data.activeRune.selectedPoint
            });
        },
        render: function() {
            if (this.state.point) {
                let _this = this;
                let x = this.state.point.x;
                let y = this.state.point.y;
                return (
                    <div>
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
                        </Switch>
                        <div>
                            {
                                this.state.point.isCurve ?
                                    <div>
                                        <Handle handle={this.state.point.handle1} />
                                        <Handle handle={this.state.point.handle2} />
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
                );
            } else {
                return null;
            }
        }
    })
};