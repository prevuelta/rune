'use strict';

let React = require('react');
let Events = require('../../global/Events');
let Button = require('../../components/Button.jsx');
let GridModel = require('../../models/GridModel');

module.exports = {
    title: 'Grid',
    collapsed: true,
    panel: React.createClass({
        getInitialState : function() {
            return {data: this.props.data.tablet.gridOptions };
        },
        updateData: function(e) {
            let baseUnit = this.refs.baseUnit.getDOMNode().value;
            let ratio = this.refs.ratio.getDOMNode().value;
            // let units = this.refs.units.getDOMNode().value;
            let boardX = this.refs.boardX.getDOMNode().value;
            let boardY = this.refs.boardY.getDOMNode().value;
            let grid = {
                old: new GridModel(this.state.data)
            };
            this.state.data.baseUnit = +baseUnit;
            this.state.data.ratio = +ratio;
            // this.state.data.units = +units;
            // To be moved into canvas panel
            this.state.data.board = {x: +boardX, y: +boardY};
            grid.new = new GridModel(this.state.data);
            Events.gridUpdate.dispatch(grid);
            Events.redrawView.dispatch();
        },
        render: function() {
            return (
                <div>
                    <label>Zoom level</label>
                    <input type="text" ref="baseUnit" defaultValue={ this.state.data.baseUnit} />
                    <label>Ratio</label>
                    <input type="text" ref="ratio" defaultValue={ this.state.data.ratio} />
                    <label>Board</label>
                    <input type="text" ref="boardX" defaultValue={this.state.data.board.x} />
                    <input type="text" ref="boardY" defaultValue={this.state.data.board.y} />
                    <button onClick={this.updateData}>
                        Update
                    </button>
                </div>
            );
        }
    })
};