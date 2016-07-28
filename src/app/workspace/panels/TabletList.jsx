'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');
let ButtonGroup = require('../../components/ButtonGroup.jsx');
let Sheet = require('../../components/Sheet.jsx');

// Icons
let Cross = require('../../icons/Cross.jsx');

module.exports = {
    title: 'Tablets',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {tablets: this.props.tablets, activeTable: this.props.activeTablet };
        },
        loadTablet: function (tabletId) {
            Events.loadTablet.dispatch(tabletId);
        },
        newTablet: function () {
            Events.addTablet.dispatch();
            Events.refreshPanels.dispatch();
        },
        render: function() {
            return (
                <div>
                        {
                            this.state.tablets.map((tablet) => {
                                return (
                                <Sheet
                                    active={tablet.active}
                                    onClick={this.loadTablet.bind(this, tablet)}>
                                    <span>{ tablet.name }</span>
                                </Sheet>)
                            })
                        }
                        <ButtonGroup>
                            <Button
                                handler={this.newTablet}>
                                <Cross />
                            </Button>
                        </ButtonGroup>

                </div>
            );
        }
    })
};