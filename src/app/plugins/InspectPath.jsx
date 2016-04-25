'use strict';

let React = require('react');
let Events = require('../global/Events');
let Switch = require('../components/Switch.jsx');

module.exports = function(data) {
    return {
        title: 'Inspect path',
        collapsed: false,
        panel: React.createClass({
            getInitialState: function () {
                return {path: data.path};
            },
            changeHandler: function () {
                this.state.path.isClosed = !this.state.path.isClosed;
                this.setState({path: this.state.path});
                Events.redraw.dispatch();
            },
            render: function() {
                // debugger;
                return (
                    <div>
                        { this.state.path.points.map((p) => `[${p.x},${p.y}]`).join(' ') }
                        <Switch onToggle={this.changeHandler} symbol="&"></Switch>
                    </div>
                );
            }
        })
    };
}