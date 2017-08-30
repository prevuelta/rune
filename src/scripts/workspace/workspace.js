'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Rune from './components/rune';
import * as actionCreators from '../actions/actions';

// Panels
import PanelContainer from './panels/panelContainer';
import TabletPanel from './panels/tabletPanel';
import PathPanel from './panels/pathPanel';

let panels = {
    'Tablet' : TabletPanel,
    'Path' : PathPanel
};

let Workspace = props => {
    return (
        <div id="rune-workspace">
            <div id="rune-tools"></div>
            <div id="rune-panels">
                {
                    Object.keys(panels).map((k, i) => { let Panel = panels[k]; return (<PanelContainer title={k} key={i}><Panel /></PanelContainer>)})
                }
            </div>
            <div id="runes" onClick={props.deselectAllPoints}>
                {
                    props.runes.map((r, i) => {
                        return <Rune
                                    tablet={props.tablet}
                                    key={i}
                                    id={r.id}
                                    />
                    })
                }
            </div>
        </div>
    );
}

function mapStateToProps (state) {
    let tablet = state.tablet.all[state.tablet.current];
    let runes = state.rune.all.filter(r => r.tablet === tablet.id)
    return {
        tablet,
        runes
    };
}

export default connect(mapStateToProps, actionCreators)(Workspace);
