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
            setActive: function () {
                Events.toolSelected.dispatch();
            },
            render: function () {
                return (
                    <div
                        className="tool"
                        onClick={this.setActive}
                        >
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