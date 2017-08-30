let React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <svg viewBox="0,0,360,120" width="360" height="120" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 0v40h280V0h40v120h-40V80H40v40H0V0z" strokeMiterlimit="10" />
            </svg>
        );
    }
});

