'use strict';

let React = require('react');

// Tools
let tools = [
    require('./canvas/CanvasTools'),
    require('./data/DataTools'),
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

        let Bar = React.createClass({
            render: function () {
                return (
                    <div className="tool-bar">
                        {
                            this.props.bar.map(t => {
                                let Component = t;
                                return (
                                    <Tool>
                                        <Component />
                                    </Tool>
                                );
                            })
                        }
                    </div>
                );
            }
        }); 

        React.render(
            <div>
            {
                tools.map(b => {
                    return (
                        <Bar bar={b}>
                        </Bar>
                    );
                })
            }
            </div>,
            document.getElementById('rune-tools')
        );

    }
}

module.exports = new ToolsController();