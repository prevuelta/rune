'use strict';

let React = require('react');
let Events = require('../../../global/Events');

// Components
let Button = require('../../../components/Button.jsx');
// Icon
let HandIcon = require('../../../icons/Hand.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <Button>
                <HandIcon />
            </Button>
        );
    }
});