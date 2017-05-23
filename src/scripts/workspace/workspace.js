'use strict';

import React from 'react';

import {connect} from 'react-redux';

import Rune from './components/rune';

let Workspace = props => {
    return (
        <div>
            <div id="rune-tools"></div>
            <div id="rune-panels"></div>
            <div id="rune-overlay"></div>
            {
                props.runes.map((r, i) => <Rune index={i} tablet={props.tablet} key={i} data={r} /> )
            }
        </div>
    );
}

function mapStateToProps (state, ownProps = {}) {
    //Get runes via tablet id 
    let tablet = state.tablets[state.currentTabletIndex];
    return { tablet, runes: state.runes.filter(r => r.tablet === state.currentTabletIndex ) };
}

function mapDispatchToProps (dispatch) {
    return ({
        dispatch
    });
}

export default connect(mapStateToProps, dispatch => ({dispatch}))(Workspace);

