'use strict';

let Util = require('../../global/Util');
let Draggable = require('react-draggable');

let React = require('react');
let Events = require('../../global/Events');
let PanelWrapper = require('./PanelWrapper.jsx');

let allPanels = [
    require('./TabletList.jsx'),
    require('./InspectPoint.jsx'),
    require('./InspectPath.jsx'),
    require('./GridManager.jsx'),
    require('./Canvas.jsx')
];

class PanelController {

    loadApp (app) {
        this.app = app;
        this.init();
    }

    init () {

        let app = this.app;

        let Panels = React.createClass({
            getInitialState: function () {
                return { 
                    panels : this.props.panels,
                    data : this.props.data,
                    canvas: this.props.canvas,
                    tablets: this.props.tablets
                };
            },
            componentWillReceiveProps: function (nextProps) {
                return nextProps;
            },
            render: function() {
                return (
                    <div>
                        {
                            this.state.panels.map((panel) => {
                                let Component = panel.panel;
                                return (
                                    <PanelWrapper
                                        key={panel.title}
                                        options={{title : panel.title, collapsed: panel.collapsed }} >
                                         <Component
                                            data={this.state.data}
                                            canvas={this.state.canvas}
                                            tablets={this.state.tablets} />
                                     </PanelWrapper>
                                );
                            })
                        }
                    </div>
                );
            }
        });

        // Plugin panels
        let panels = React.render(
            <Panels
                panels={allPanels}
                data={app.data}
                canvas={app.canvas}
                tablets={app.savedTablets} />,
            document.getElementById('rune-panels')
        );


        function reloadHandler () {
            panels.replaceState({'data' : app.data, 'panels' : allPanels, canvas: app.canvas, tablets: app.savedTablets });
        };

        Events.reloadPanels.add(reloadHandler.bind(app));

        Events.refreshPanels.add(() => {
            panels.setState({'data' : app.data});
        });

    }
}

module.exports = new PanelController();