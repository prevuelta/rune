'use strict';

import React from 'react';

import {connect} from 'react-redux';

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
  return { todos: state.todos };
}

export default connect(mapStateToProps, (text) => {type: 'ADD_TODO', text})(Workspace);

