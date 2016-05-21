'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

// Components:
let Button = require('../../components/Button.jsx');

// Icons
let Cross = require('../../icons/Cross.jsx');

module.exports = {
    title: 'Tablets',
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
                    <div>
                        {
                            this.state.tablets.map((tablet) => {
                                return (
                                <div
                                    className="svg-preview"
                                    onClick={this.loadTablet.bind(this, tablet)}>
                                    <div
                                        dangerouslySetInnerHTML={{__html: tablet.renderedSVG}}
                                        >
                                    </div>
                                </div>)
                            })
                        }
                        <Button
                            handler={this.newTablet.bind(this)}>
                            <Cross />
                        </Button>
                    </div>
                </div>
            );
        }
    })
};