'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');
let Cross = require('../../icons/Cross.jsx');
let XYInput = require('../../components/XYInput.jsx');

module.exports = {
    title: 'Canvas',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {options: this.props.data.tablet.options };
        },
         updateBoard (board) {
            this.state.options.board = board;
            this.setState({options: this.state.options});
            Events.redrawView.dispatch();
        },
        render: function() {
            return (
                <div>
                    <div className="pane">
                        <span>Mode</span>
                    </div>
                    <div className="pane">
                         <label>Board</label>
                        <XYInput value={this.state.options.board} change={this.updateBoard} />
                        <label>Zoom level</label>
                        <input type="number" ref="baseUnit" defaultValue={ this.state.options.zoomLevel} />
                        <span>Zoom</span>
                        <Button>
                            <Cross />
                        </Button>
                    </div>
                </div>
            );
        }
    })
};