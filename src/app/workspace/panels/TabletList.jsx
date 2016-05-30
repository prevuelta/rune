'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');

// Icons
let Cross = require('../../icons/Cross.jsx');

module.exports = {
    title: 'Saved Tablets',
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
                    <div className="tablet-previews">
                        {
                            this.state.tablets.map((tablet) => {
                                return (
                                <div
                                    className="tablet-preview"
                                    onClick={this.loadTablet.bind(this, tablet)}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: tablet.renderedSVG}}
                                        >
                                    </div>
                                </div>)
                            })
                        }
                        <div
                            className="tablet-preview">
                            <div
                                dangerouslySetInnerHTML={{__html: this.props.activeTablet.renderedSVG}}
                                >
                            </div>
                        </div>
                        <div className="tablet-preview">
                            <Button
                                handler={this.newTablet.bind(this)}>
                                <Cross />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    })
};