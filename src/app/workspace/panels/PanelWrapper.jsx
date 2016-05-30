'use strict';

let React = require('react');

// Components
let Switch = require('../../components/Switch.jsx');

// Icons:
let Stack = require('../../icons/Stack.jsx');

module.exports = React.createClass({
    handleStart: function () {

    },
    handleDrag: function () {

    },
    toggleShow: function () {
        this.setState({collapsed: !this.state.collapsed});
    },
    getInitialState: function () {
        return { collapsed : this.props.options.collapsed };
    },
    render: function() {
        return (
            <div className="panel">
                <div className="handle" onClick={this.toggleShow}>
                    { this.props.options.title }
                    <Switch
                        onToggle={this.toggleShow}
                        toggle={this.props.collapsed}>
                        <Stack />
                    </Switch>
                </div>
                { !this.state.collapsed ?
                <div className="panel-content">
                    { this.props.children }
                </div> : null }
            </div>
        );
    }
});
