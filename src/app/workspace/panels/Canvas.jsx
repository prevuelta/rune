'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');
let Cross = require('../../icons/Cross.jsx');

module.exports = {
    title: 'Canvas',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {tablets: this.props.tablets };
        },
        loadTablet: function (tabletId) {
            Events.loadTablet.dispatch(tabletId);
        },
        newTablet: function () {
            Events.addTablet.dispatch();
        },
        render: function() {
            return (
                <div>
                    <div className="pane pane-half">
                        <span>Mode</span>
                    </div>
                    <div className="pane pane-half">
                        <span>Zoom</span>
                        <Button>
                            <Cross />
                        </Button>
                    </div>
                </div>
            );
        }
    })
};