'use strict';

let Util = require('../../global/Util');
let Draggable = require('react-draggable');

let React = require('react');
let Events = require('../../global/Events');
let PanelWrapper = require('./PanelWrapper.jsx');
let TabletList = require('./TabletList.jsx');

let allPanels = [
    require('./InspectPoint.jsx'),
    require('./InspectPath.jsx'),
    require('./GridManager.jsx')
];

class PanelController {

    constructor (app, tablets) {
        this.app = app;
        this.tablets = tablets;
        this.init();
    }

    init () {

        let _this = this;

        let Panels = React.createClass({
            getInitialState: function () {
                return { panels : this.props.panels, data : this.props.data, canvas: this.props.canvas };
            },
            componentWillReceiveProps: function (nextProps) {
                return nextProps;
            },
            render: function() {
                let _this = this;
                return (
                    <div>
                        {
                            this.state.panels.map((panel) => {
                                let Component = panel.panel;
                                return <PanelWrapper options={{title : panel.title, collapsed: panel.collapsed }} >
                                     <Component data={_this.state.data} canvas={_this.state.canvas} />
                                 </PanelWrapper>;
                            })
                        }
                    </div>
                );
            }
        });

        // Plugin panels
        let panels = React.render(
            <Panels
                panels={ allPanels}
                data={_this.app.data}
                canvas={_this.app.canvas} />,
            document.getElementById('rune-panels')
        );

        let TabletListPanel = TabletList.panel;

        let tabletPanel = React.render(
            <PanelWrapper options={{title : TabletList.title, collapsed: TabletList.collapsed }} >
                 <TabletListPanel tablets={_this.tablets} />
             </PanelWrapper>,
             document.getElementById('rune-tabs')
        );

        function reloadHandler () {
            console.log("Reloading panels...");
            panels.replaceState({'data' : _this.app.data, 'panels' : allPanels, canvas: _this.app.canvas });
        };

        Events.reloadPanels.add(reloadHandler.bind(_this));

        Events.refreshPanels.add(() => {
            panels.setState({'data' : _this.app.data});
        });

    }
}

// <Draggable
//     start={{x: offsetX + 800, y: offsetY }}
//     onStart={this.handleStart}
//     handle=".handle"
//     >
//     <div className="panel">
//         <div className="handle">{ this.props.options.title }<span className="toggle">-</span></div>
//         <div className="panel-content">
//             { this.props.children }
//         </div>
//     </div>
// </Draggable>


module.exports = PanelController;