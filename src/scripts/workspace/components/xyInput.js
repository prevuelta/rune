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

    _onChange (event, axis) {
        let value = +event.target.value;
        this.setState({ [axis] : value });
        let response = { x: this.state.x, y: this.state.y };
        response[axis] = value;
        this.props.onChange(response);
    }

    render () {
        return (
            <div>
                <h3>{this.props.label}</h3>
                <div className="flex-group">
                    <label>X:</label>
                    <input
                        className="input-x"
                        defaultValue={this.state.x}
                        onChange={e => this._onChange(e, 'x')}
                        type="number"
                        step="1" />
                    <label>Y:</label>
                    <input
                        className="input-y"
                        defaultValue={this.state.y}
                        onChange={e => this._onChange(e, 'y')}
                        type="number"
                        step="1" />
                </div>
            </div>
        );
    }
}

export default XYInput;
