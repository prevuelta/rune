'use strict';

let React = require('react');
let Events = require('../global/Events');
let Switch = require('../components/Switch.jsx');
let Button = require('../components/Button.jsx');

let PointData = React.createClass({
    getInitialState: function () {
        return {point: this.props.point};
    },
    setIsCurve: function (point) {
        point.isCurve = !point.isCurve;
        this.setState({point: point});
        Events.redraw.dispatch();
    },
    toggleActive : function () {
        Events.selectPoint.dispatch(this.state.point);
        this.setState({point: this.state.point});
    },
    componentWillReceiveProps : function (nextProps) {
      return {point: nextProps};
    },
    changeHandle: function (ref, event) {
        let coords = event.target.value.split(',');
        let p = this.state.point;
        p[ref] = coords.length === 2 ? coords.map(c => +c) : null;
        this.setState({point: p});
        Events.redraw.dispatch();
    },
    deletePoint: (point) => {
        Events.deletePoint.dispatch(point);
    },
    render: function() {
        let x = this.props.point.x;
        let y = this.props.point.y;
        let classNames = this.state.point.isSelected ? 'sheet active' : 'sheet';
        return (
            <div 
                onClick={this.toggleActive}
                className={classNames}>
                <small>
                    <span>x: {x}, y:{y}</span>
                </small>
                {this.state.point.transforms}
                <Switch onToggle={this.setIsCurve.bind(this, this.state.point)} symbol="S"></Switch>
                <Button point={this.state.point} symbol="X"></Button>
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
            </div>
        );
    }
});

module.exports = function(data) {
    return {
        data: data,
        title: 'Inspect path',
        collapsed: false,
        panel: React.createClass({
            getInitialState: function () {
                console.log("Path", this.props.data.path);
                return {path: this.props.data.path};
            },
            changeHandler: function () {
                this.state.path.isClosed = !this.state.path.isClosed;
                this.setState({path: this.state.path});
                Events.redraw.dispatch();
            },
            addPath: () => {
                console.log("Adding path");
                Events.addPath.dispatch();
            },
            render: function() {
                // debugger;
                return (
                    <div className="sheet">
                        <span onClick={this.addPath}>New path</span>
                        <Switch onToggle={this.changeHandler} symbol="&"></Switch>
                        { this.state.path.points.map((p) => <PointData point={p}></PointData> ) }
                    </div>
                );
            }
        })
    };
}