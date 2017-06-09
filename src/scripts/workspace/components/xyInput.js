'use strict';

import React from 'react';

class XYInput extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y
        };
    }

    updateX: function (event, axis) {
        this.state[axis] = +event.target.value;
        this.props.onChange({ x: this.state.x, y: this.state.y});
    }

    render: function() {
        return (
            <div>
                <label>{this.props.label}</label>
                <div className="flex-group">
                    <label>X:</label>
                    <input
                        className="input-x"
                        defaultValue={this.state.coords.x}
                        onChange={e => this._onChange(e, 'x')}
                        type="number"
                        step="1" />
                    <label>Y:</label>
                    <input
                        className="input-y"
                        defaultValue={this.state.coords.y}
                        onChange={e => this._onChange(e, 'y')}
                        type="number"
                        step="1" />
                </div>
            </div>
        );
    }
}

export default XYInput;
