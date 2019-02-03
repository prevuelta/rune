'use strict';

import React, { Component } from 'react';

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: props.toggle || false,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ toggle: newProps.toggle });
    }

    _toggle = () => {
        if (this.props.onToggle) {
            this.props.onToggle();
        }
        this.setState({ toggle: !this.state.toggle });
    };

    render() {
        let classes = `switch ${this.state.toggle ? 'on' : 'off'}`;
        return (
            <div className={classes} onClick={this._toggle}>
                {this.props.children || this.props.symbol}
            </div>
        );
    }
}

export default Switch;
