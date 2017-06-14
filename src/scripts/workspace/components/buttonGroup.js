'use strict';

let React = require('react');

export default function (props) {
    return (
        <div
            className="button-group">
            { this.props.children }
        </div>
    );
}
