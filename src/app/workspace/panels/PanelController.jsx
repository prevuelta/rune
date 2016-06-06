'use strict';

let Util = require('../../global/Util');
let Draggable = require('react-draggable');

let React = require('react');
let Events = require('../../global/Events');
let PanelWrapper = require('./PanelWrapper.jsx');
let TabletList = require('./TabletList.jsx');
let Canvas = require('./Canvas.jsx');

let allPanels = [
    require('./InspectPath.jsx'),
    require('./InspectPoint.jsx'),
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
                                return <PanelWrapper key={panel.title} options={{title : panel.title, collapsed: panel.collapsed }} >
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

        let TabletListPanel = React.createClass({
            render: function () {
                let Component = TabletList.panel;
                return (<PanelWrapper options={{title : this.props.title, collapsed: this.props.collapsed }} >
                     <Component
                        tablets={this.props.tablets}
                        activeTablet={this.props.tablet} />
                </PanelWrapper>);
            }
        });

        let CanvasPanel = React.createClass({
            render: function () {
                let Component = Canvas.panel;
                return (<PanelWrapper options={{title : this.props.title, collapsed: this.props.collapsed }} >
                     <Component />
                </PanelWrapper>);
            }
        });

        let tabletPanel = React.render(
            <div>
                <TabletListPanel
                title={TabletList.title}
                collapsed={TabletList.collapsed}
                tablets={_this.tablets}
                tablet={this.app.data.tablet}/>
                <CanvasPanel
                title={Canvas.title}
                collapsed={Canvas.collapsed}/>
            </div>,
             document.getElementById('rune-tabs')
        );

        // let canvasPanel = React.render(
        //     <CanvasPanel
        //         title={Canvas.title}
        //         collapsed={Canvas.collapsed}/>,
        //      document.getElementById('rune-tabs')
        // );

        function reloadHandler () {
            panels.replaceState({'data' : _this.app.data, 'panels' : allPanels, canvas: _this.app.canvas });
        };

        Events.reloadPanels.add(reloadHandler.bind(_this));

        Events.refreshPanels.add(() => {
            panels.setState({'data' : _this.app.data});
            tabletPanel.setState({tablet: _this.app.data.tablet});
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