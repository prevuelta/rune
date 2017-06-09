'use strict';

import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import React from 'react';

// Components
import XYInput from '../components/xyInput';
import Button from '../components/button';
import Cross from '../icons/cross';


class GridPanel extends React.Component {
    constructor (props) {
        super(props);
    }

    _updateSize (value) {
        this._updateLayout('size', value);
    }

    _updateLayout (prop, value) {
        let layout = this.props.layout;
        layout[prop] = value;
        this.props.updateTabletLayout(layout);
    }

    render () {
        return (
            <div>
                <div className="pane">
                    <span>Mode</span>
                </div>
                <div className="pane">
                    <label>Board</label>
                    <XYInput
                        x={this.props.layout.size.x}
                        y={this.props.layout.size.y}
                        onChange={this._updateSize.bind(this)} />
                    <Button>
                        <Cross />
                    </Button>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    let tablet = state.tablets[state.currentTabletIndex];
    let { layout } = tablet.options;
    return {
        layout
    };
}

export default connect(mapStateToProps, actionCreators)(GridPanel);
// let React = require('react');
// let Events = require('../../global/Events');
// let Button = require('../../components/Button.jsx');
// let GridModel = require('../../data/GridModel');


// module.exports = {
//     title: 'Grid',
//     collapsed: true,
//     panel: React.createClass({
//         getInitialState : function() {
//             return {data: this.props.data.tablet.options.grid };
//         },
//         updateData: function(e) {
//             let baseUnit = this.refs.baseUnit.getDOMNode().value;
//             let ratio = this.refs.ratio.getDOMNode().value;
//             // let units = this.refs.units.getDOMNode().value;
//             // let boardX = this.refs.boardX.getDOMNode().value;
//             // let boardY = this.refs.boardY.getDOMNode().value;
//             let grid = {
//                 old: new GridModel(this.state.data)
//             };
//             this.state.data.baseUnit = +baseUnit;
//             this.state.data.ratio = +ratio;
//             // this.state.data.units = +units;
//             // To be moved into canvas panel
//             // this.state.data.board = {x: +boardX, y: +boardY};
//             grid.new = new GridModel(this.state.data);
//             Events.gridUpdate.dispatch(grid);
//             Events.redrawView.dispatch();
//         },
//         render: function() {
//             return (
//                 <div>
//                     <label>Ratio</label>
//                     <input type="text" ref="ratio" defaultValue={this.state.data.ratio} />
//                     <button onClick={this.updateData}>
//                         Update
//                     </button>
//                 </div>
//             );
//         }
//     })
// };
