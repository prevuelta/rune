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
                                    dangerouslySetInnerHTML={{__html: tablet.renderedSVG}}
                                    onClick={this.loadTablet.bind(this, tablet)}>
                                </div>)
                            })
                        }
                        <div
                            onClick={this.newTablet}
                            className="tablet-preview">
                            <Button>
                                <Cross />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    })
};