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
let X = require('../../icons/X.jsx');

module.exports = {
    title: 'Tablets',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {tablets: this.props.data.tablets };
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                tablets: nextProps.data.tablets
            });
        },
        loadTablet: function (tabletId) {
            Events.loadTablet.dispatch(tabletId);
        },
        deleteTablet: function (tablet) {
            Events.deleteTablet.dispatch(tablet);
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
                                     <ButtonGroup>
                                        <Button
                                            handler={this.deleteTablet.bind(this, tablet)}>
                                            <X />
                                        </Button>
                                    </ButtonGroup>
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