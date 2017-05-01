'use strict';

import React from 'react';

import {connect} from 'react-redux';

import Tablet from './components/tablet';

let Workspace = props => {
    console.log(props);
    return (
        <div>
            <div id="rune-tools"></div>
            <div id="rune-panels"></div>
            <div id="rune-overlay"></div>
            {
                props.tablets.map(t => <Tablet data={t} /> )
            }
        </div>
    );
}

function mapStateToProps (state, ownProps = {}) {
  return { tablets: state.tablets };
}

function mapDispatchToProps (dispatch) {
    return ({
        dispatch
    });
}

export default connect(mapStateToProps, dispatch => ({dispatch}))(Workspace);

