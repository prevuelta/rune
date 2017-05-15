'use strict';

let React = require('react');
let Button = require('./Button.jsx');
let X = require('../icons/X.jsx');
let Header = require('./Header.jsx');

function Dialogue (props) {
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

export default Dialogue;