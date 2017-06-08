'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Rune from './components/rune';
import * as actionCreators from '../actions/actions';

// Panels
import GridPanel from './panels/gridPanel';
import PanelContainer from './panels/panelContainer';

let panels = {
    'Grid' : GridPanel
};

let Workspace = props => {
    console.log("Workspace props", props)
    return (
        <div id="rune-workspace" onClick={props.deselectAllPoints}>
            <div id="rune-tools"></div>
            <div id="rune-panels">
                <div>
                    {
                        Object.keys(panels).map((k, i) => { let Panel = panels[k]; return (<PanelContainer title={k} key={i}><Panel /></PanelContainer>)})
                    }
                </div>
            </div>
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
    );
}

function mapStateToProps (state) {
    let tablet = state.tablets[state.currentTabletIndex];
    let runes = state.runes.filter(r => r.tablet === tablet.id)
    return {
        tablet,
        runes
    };
}

export default connect(mapStateToProps, actionCreators)(Workspace);
