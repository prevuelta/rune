'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');
let ButtonGroup = require('../../components/ButtonGroup.jsx');

// Icons
let Cross = require('../../icons/Cross.jsx');

module.exports = {
    title: 'Runes',
    collapsed: false,
    panel: React.createClass({
        getInitialState : function() {
            return {runes: this.props.data.tablet.runes };
        },
        loadrune: function (runeId) {
            Events.loadrune.dispatch(runeId);
        },
        newrune: function () {
            Events.addrune.dispatch();
            Events.refreshPanels.dispatch();
        },
        render: function() {
            return (
                <div>
                    <div className="rune-previews">
                        {
                            this.state.runes.map((rune) => {
                                return (
                                <div
                                    className="rune-preview"
                                    dangerouslySetInnerHTML={{__html: rune.renderedSVG}}
                                    onClick={this.loadrune.bind(this, rune)}>
                                </div>)
                            })
                        }
                    </div>
                    <ButtonGroup>
                        <Button
                            handler={this.newRune}>
                            <Cross />
                        </Button>
                    </ButtonGroup>
                </div>
            );
        }
    })
};