'use strict';

let React = require('react');
let Events = require('../global/Events');

module.exports = function(data) {
    return {
        title: 'Inspect path',
        panel: React.createClass({
            getInitialState: function () {
                return {path: data.path};
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
                return (
                    <div>
                        <span onClick={this.addPath}>New path</span>
                        <label for="closedPath">
                            {this.state.path.points.map((p) => `[${p.x},${p.y}]`).join(' ')}
                            <input 
                            type="checkbox" 
                            id="closedPath"
                            defaultValue={this.state.path.isClosed}
                            checked={this.state.path.isClosed}
                            onClick={this.changeHandler} />
                            Closed
                        </label>
                    </div>
                );
            }
        })
    };
}