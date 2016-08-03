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
            return {
                runes: this.props.data.tablet.runes,
                activeRune: this.props.data.tablet.activeRune
            };
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                runes: nextProps.data.tablet.runes,
                activeRune: this.props.data.tablet.activeRune
            });
        },
        loadRune: function (runeId) {
            Events.loadRune.dispatch(runeId);
        },
        newRune: function () {
            Events.addRune.dispatch();
        },
        render: function() {
            return (
                <div>
                    <div className="rune-previews">
                        {
                            this.state.runes.map((rune) => {
                                let classNames = rune === this.state.activeRune ? 'rune-preview active' : 'rune-preview';
                                return (
                                <div
                                    className={classNames}
                                    dangerouslySetInnerHTML={{__html: rune.renderedSVG}}
                                    onClick={this.loadRune.bind(this, rune)}>
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