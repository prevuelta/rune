'use strict';

import React from 'react';

import {connect} from 'react-redux';
import action from '../actions/action';

let Workspace = props => {
    console.log(props)
    return (
        <div>
            <h1>Hello world</h1>
            <div id="rune-tools"></div>
            <div id="rune-panels"></div>
            <div id="rune-overlay"></div>
            {
                props.todos.map(t => <p>{t.text}</p>)
            }
            <button onClick={() => props.dispatch({ type: 'ADD_TODO', text: 'wat'})}>Add</button>
        </div>
    );
}

function mapStateToProps (state, ownProps = {}) {
  console.log(state); // state
  return { todos: state.todos };
}

export default connect(mapStateToProps, action)(Workspace);

