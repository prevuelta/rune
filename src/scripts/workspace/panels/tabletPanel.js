'use strict';

import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import React from 'react';

// Components
import XYInput from '../components/xyInput';
import NumberInput from '../components/numberInput';
import Button from '../components/button';
import Cross from '../icons/cross';


class TabletPanel extends React.Component {
    constructor (props) {
        super(props);
    }

    _updateSize (value) {
        console.log(value);
        this._updateTablet('x', value.x);
        this._updateTablet('y', value.y);
    }

    _updateTablet (prop, value) {
        console.log(prop, value);
        let { tablet } = this.props;
        tablet[prop] = value;
        this.props.updateTablet(tablet);
    }

    render () {
        return (
            <div>
                <div className="pane">
                    <NumberInput
                        value={this.props.tablet.gridUnit}
                        label="Grid Unit"
                        onChange={this._updateTablet.bind(this, 'gridUnit')} />
                    <XYInput
                        label="Size"
                        x={this.props.tablet.x}
                        y={this.props.tablet.y}
                        onChange={this._updateSize.bind(this)} />
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    let tablet = state.tablet.all[state.tablet.current];
    return {
        tablet
    };
}

export default connect(mapStateToProps, actionCreators)(TabletPanel);
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
