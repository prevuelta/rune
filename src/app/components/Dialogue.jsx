'use strict';

let React = require('react');
let Button = require('./Button.jsx');
let X = require('../icons/X.jsx');
let Header = require('./Header.jsx');

module.exports = React.createClass({
    // getInitialState: function () {
    //     return {toggle: this.props.toggle};
    // },
    // toggle: function () {
    //     this.props.onToggle();
    //     this.setState({toggle: !this.state.toggle});
    // },
    hide: function () {
        React.unmountComponentAtNode(this.props.element);
    },
    render: function () {
        return (
            <div
                className="overlay">
                <div className="dialogue">
                    <Header>
                        {this.props.title}
                        <Button
                            handler={this.hide.bind(this)}>
                            <X/>
                        </Button>
                    </Header>
                    { this.props.children }
                </div>
            </div>
        );
    }
});