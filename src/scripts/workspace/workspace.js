'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Rune from './components/rune';

let Workspace = props => {
    return (
        <div onClick={props.onWorkspaceClick}>
            <div id="rune-tools"></div>
            <div id="rune-panels"></div>
            <div id="rune-overlay"></div>
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

function mapDispatchToProps (dispatch) {
    return ({
        dispatch
    });
}

export default connect(mapStateToProps, dispatch => ({dispatch}))(Workspace);

