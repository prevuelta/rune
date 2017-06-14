'use strict';

// let Util = require('../../global/Util');
// let Draggable = require('react-draggable');

import React from 'react';
// let Events = require('../../global/Events');
// let PanelWrapper = require('./PanelWrapper.jsx');

// Componente
import Button from '../components/button'
import Switch from '../components/switch';

// Icons
import StackIcon from '../icons/stack';

class PanelContainer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    _toggleCollapsed () {
        this.setState({collapsed: !this.state.collapsed});
    }

    render () {
        let { title, children } = this.props;
        let className = this.state.collapsed ? 'collapsed' : '';
        return (
            <div className="panel">
                <div className="handle" onClick={() => this._toggleCollapsed()}>
                    { title }
                    <Switch
                        onToggle={() => this._toggleCollapsed()}
                        toggle={this.state.collapsed}>
                        <StackIcon />
                    </Switch>
                </div>
                { !this.state.collapsed ?
                    <div className="panel-content">
                        { children }
                    </div> : null }
            </div>
        );
    }
}

export default PanelContainer;
