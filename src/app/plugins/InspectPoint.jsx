'use strict';

let React = require('react');

let PointData = React.createClass({
    getInitialState: function () {
        return {point: this.props.point};
    },
    changeHandler: function (point) {
        point.isCurve = !point.isCurve;
        this.setState({point: point});
    },
    componentWillReceiveProps : function (nextProps) {
      return {point: nextProps};
    },
    render: function() {
        let x = this.props.point.x;
        let y = this.props.point.y;
        return (
            <li>
                <small>x: {x}, y:{y}</small><br/>
                <input 
                    type="checkbox" 
                    defaultValue={this.state.point.isCurve}
                    checked={this.state.point.isCurve}
                    onClick={this.changeHandler.bind(this, this.state.point)} />
                isCurve
            </li>
        );
    }
});


module.exports = function(data) {
    return {
        data: data.selectedPoints,
        title: 'Inspect point',
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