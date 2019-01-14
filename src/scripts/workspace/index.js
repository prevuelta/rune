'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Rune from './components/rune';
import * as actionCreators from '../actions';

// Panels
// import PanelContainer from './panels/panelContainer';
// import TabletPanel from './panels/tabletPanel';
// import PathPanel from './panels/pathPanel';
import { Data } from '../data';

import { MODE, MODE_TAG } from '../util/constants';

// let panels = {
// Tablet: TabletPanel,
// Path: PathPanel,
// };

let Workspace = props => {
    return (
        <div id="rune-workspace">
            <div id="rune-status">
                <span className="tag">{MODE_TAG[props.app.mode]} mode</span>
            </div>
            <div id="rune-tools" />
            <div id="runes" onClick={props.deselectAllPoints}>
                {props.runes.map((r, i) => {
                    return <Rune rune={r} key={i} />;
                })}
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    const tablet = Data.getTablet(state);
    const runes = Data.getRunes(state);
    console.log(runes);
    const { app } = state;
    return {
        runes,
        app,
    };
}
// <div id="rune-panels">
//     {Object.keys(panels).map((k, i) => {
//         let Panel = panels[k];
//         return (
//             <PanelContainer title={k} key={i}>
//                 <Panel />
//             </PanelContainer>
//         );
//     })}
// </div>

export default connect(mapStateToProps, actionCreators)(Workspace);
