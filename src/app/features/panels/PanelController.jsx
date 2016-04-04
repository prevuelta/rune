'use strict';

var Util = require('../../global/Util');
var React = require('react');
var Draggable = require('react-draggable');

var React = require('react');

// var getGridPanelComponent = require('./grid/GridPanelComponent.jsx');

class PanelController {
    constructor (app) {
        this.app = app;
        this.init();
    }
    init () {

        var panelController = this;

        var PanelWrapper = React.createClass({
            handleStart: function() {

            },
            handleDrag: function() {

            },
            render: function() {
                var offsetY = this.props.offset * 50;
                var offsetX = this.props.offset * 5;
                return (
                    <div className="panel">
                        <div className="handle">
                            { this.props.options.title }
                        </div>
                        <div className="panel-content">
                            { this.props.children }
                        </div>
                    </div>
                );
            }
        });

        var Panels = React.createClass({
            render: function() {
                return (
                    <div>
                        {
                            this.props.data.map(function(panel, idx) {
                                var Component = panel.panel;
                                return <PanelWrapper offset={idx} options={{title : panel.title}} >
                                     <Component data={panel.data} />
                                 </PanelWrapper>;
                            })
                        }
                    </div>
                );
            }
        });

        // Plugin panels
        React.render(
            <Panels data={panelController.app.plugins} />,
            document.getElementById('rune-panels')
        );


    }

    updateProperties (model) {

    }
}

// <Draggable
//     start={{x: offsetX + 800, y: offsetY }}
//     onStart={this.handleStart}
//     handle=".handle"
//     >
//     <div className="panel">
//         <div className="handle">{ this.props.options.title }</div>
//         <div className="panel-content">
//             { this.props.children }
//         </div>
//     </div>
// </Draggable>


module.exports = PanelController;