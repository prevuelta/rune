'use strict';

let React = require('react');

class Switch extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            toggle: props.toggle || false
        };
    }

    _toggle () {
        if (this.props.onToggle) {
            this.props.onToggle();
        }
        this.setState({toggle: !this.state.toggle});
    }

    render () {
        let classes = `switch ${this.state.toggle ? 'on' : 'off'}`;
        return (
            <div
                className={classes}
                onClick={this._toggle.bind(this)}>
                { this.props.children || this.props.symbol }
            </div>
        );
    }
}

export default Switch;
