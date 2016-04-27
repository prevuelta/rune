'use strict';

let React = require('react');
let Events = require('../global/Events');

let PointData = React.createClass({
    getInitialState: function () {
        return {point: this.props.point};
    },
    changeHandler: function (point) {
        point.isCurve = !point.isCurve;
        point.handles = point.isCurve ? [[-132, 200], [100, -100]] : [];
        this.setState({point: point});
        Events.redraw.dispatch();
    },
    componentWillReceiveProps : function (nextProps) {
      return {point: nextProps};
    },
    render: function() {
        let x = this.props.point.x;
        let y = this.props.point.y;
        return (
            <li>
                <small>x: {x}, y:{y}</small>
                {this.state.point.transforms}
                <label for={this.state.point.x+this.state.point.y}>
                <input 
                    type="checkbox"
                    id={this.state.point.x+this.state.point.y} 
                    defaultValue={this.state.point.isCurve}
                    checked={this.state.point.isCurve}
                    onClick={this.changeHandler.bind(this, this.state.point)} />isCurve
                </label>
                {
                    this.state.point.isCurve ? 
                        <div>
                            Handle
                            <input
                                type="text"
                                defaultValue={this.state.point.handles} />
                        </div>
                    : null
                }   
            </li>
        );
    }
});


module.exports = function(data) {
    return {
        data: data.selectedPoints,
        title: 'Inspect point',
        collapsed: false,
        panel: React.createClass({
            // getInitialState : function() {
            //     let _this = this;
            //     Events.selectPoint.add(() => {
            //         this.setState(data);
            //     });
            //     return { points: data.selectedPoints };
            // },
            // getInitialState : function() {
            //     return {"data" : data};
            // },
            render: function() {
                return (
                    <div>
                        <ul>
                            {
                                Object.keys(this.props.data).map( (key) => {
                                    return <PointData point={this.props.data[key]}></PointData>
                                })
                            }
                        </ul>
                    </div>
                );
            }
        })
    };
}