'use strict';

let React = require('react');
let Events = require('../../../global/Events');

// Components
let Button = require('../../../components/Button.jsx');

// Icon
let SvgIcon = require('../../../icons/Svg.jsx');

module.exports = React.createClass({
    // getInitialState: function () {
    //     return {tablet: this.props.data.tablet};
    // },
    // componentWillReceiveProps: function(nextProps) {
    //     this.setState({
    //         tablet: nextProps.data.tablet
    //     });
    // },
    dispatch: function () {
        Events.renderSVG.dispatch();
        Events.showSvg.dispatch(); // Workspace Controller
    },
    render: function () {
        return (
            <Button
                handler={this.dispatch}>
                <SvgIcon />
            </Button>
        );
    }
});
