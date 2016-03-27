'use strict';

var util = require('../global/util.js');

// var getGridPanelComponent = require('./grid/GridPanelComponent.jsx');


function PanelController (app) {
    this.app = app;
    this.loadPanels();
}

PanelController.prototype = {
    constructor: PanelController,
    loadPanels: function() {

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
                    <Draggable
                        start={{x: offsetX + 800, y: offsetY }}
                        onStart={this.handleStart}
                        handle=".handle"
                        >
                        <div className="panel">
                            <div className="handle">{ this.props.options.title }</div>
                            <div className="panel-content">
                                { this.props.children }
                            </div>
                        </div>
                    </Draggable>
                );
            }
        });

        var Panels = React.createClass({
            render: function() {
                console.log(this.props.data);
                return (
                    <div>
                        {
                            this.props.data.map(function(panel, idx) {
                                var Component = panel.panel;
                                return <PanelWrapper offset={idx} options={{title : panel.title}} >
                                     <Component />
                                 </PanelWrapper>;
                            })
                        }
                    </div>
                );
            }
        });

        console.log(panelController.app.plugins);

        // Plugin panels
        React.render(
            <Panels data={panelController.app.plugins} />,
            document.getElementById('rune-panels')
        );


    },
    updateProperties : function(model) {

    }
}

module.exports = PanelController;