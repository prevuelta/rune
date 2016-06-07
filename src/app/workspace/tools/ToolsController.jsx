'use strict';

let React = require('react');

// Tools
let tools = [
    require('./Zoom.jsx'),
    require('./Pan.jsx'),
];

class ToolsController {
    constructor () {

        let Tool = React.createClass({
            render: function () {
                return (
                    <div className="tool">
                        {this.props.children}
                    </div>
                );
            }
        })

        React.render(
            <div>
            {
                tools.map(t => {
                    let Component = t;
                    return (
                        <Tool>
                            <Component />
                        </Tool>
                    );
                })
            }
            </div>,
            document.getElementById('rune-tools')
        );

    }
}

module.exports = new ToolsController();