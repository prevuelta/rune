'use strict';

let Util = require('../../global/Util');
let Draggable = require('react-draggable');

let React = require('react');
let Events = require('../../global/Events');

let allPanels = [
    require('./InspectPath.jsx'),
    require('./GridManager.jsx'),
    require('./LayerManager.jsx')
];

class PanelController {

    constructor (app) {
        this.app = app;
        this.init();
    }

    init () {

        let _this = this;

        let PanelWrapper = React.createClass({
            handleStart: function () {

            },
            handleDrag: function () {

            },
            toggleShow: function () {
                this.setState({collapsed: !this.state.collapsed});
            },
            getInitialState: function () {
                return { collapsed : this.props.options.collapsed };
            },
            render: function() {
                let offsetY = this.props.offset * 50;
                let offsetX = this.props.offset * 5;
                return (
                    <div className="panel">
                        <div className="handle" onClick={this.toggleShow}>
                            { this.props.options.title }
                            <span className="toggle">{this.state.collapsed ? '-' : '+'}</span>
                        </div>
                        { !this.state.collapsed ? 
                        <div className="panel-content">
                            { this.props.children }
                        </div> : null }
                    </div>
                );
            }
        });

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
                            this.state.panels.map(function(panel, idx) {
                                let Component = panel.panel;
                                return <PanelWrapper offset={idx} options={{title : panel.title, collapsed: panel.collapsed }} >
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

        function reloadHandler () {
            console.log("Reloading panels...");
            panels.replaceState({'data' : _this.app.data, 'panels' : allPanels, canvas: _this.app.canvas });
        };

        Events.reloadPanels.add(reloadHandler.bind(_this));

        Events.refreshPanels.add(() => {
            console.log("Refreshing panels...");
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