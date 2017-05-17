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
                props.tablet.runes.map((r, i) => <Rune tablet={props.tablet} key={i} data={r} /> )
            }
        </div>
    );
}

function mapStateToProps (state, ownProps = {}) {
  return { tablet: state.tablets[state.currentTabletIndex] };
}

function mapDispatchToProps (dispatch) {
    return ({
        dispatch
    });
}

export default connect(mapStateToProps, dispatch => ({dispatch}))(Workspace);

