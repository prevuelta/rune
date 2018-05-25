import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import React from 'react';

// Components
import XYInput from '../components/xyInput';
import NumberInput from '../components/numberInput';
import Button from '../components/button';
import Cross from '../icons/cross';
import { Data } from '../../data';

class TabletPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    _updateSize(value) {
        this._updateRune('x', value.x);
        this._updateRune('y', value.y);
    }

    _updateRune(prop, value) {
        let { rune } = this.props;
        rune[prop] = value;
        this.props.updateRune(rune);
    }

    render() {
        return (
            <div>
                <div className="pane">
                    <NumberInput
                        value={this.props.rune.gridUnit}
                        label="Grid Unit"
                        onChange={value => this._updateRune('gridUnit', value)}
                    />
                    <XYInput
                        label="Size"
                        x={this.props.rune.x}
                        y={this.props.rune.y}
                        onChange={this._updateSize.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const rune = Data.getRune(state);
    return {
        rune,
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
