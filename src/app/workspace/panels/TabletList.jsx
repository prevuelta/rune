'use strict';

let React = require('react');
let paper = require('paper');
let Events = require('../../global/Events');

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
        render: function() {
            return (
                <div>
                    <div>
                        {
                            this.state.tablets.map((tabletId) => {
                                return <div
                                    onClick={this.loadTablet.bind(this, tabletId)}
                                    className="sheet">
                                    {tabletId}
                                </div>
                            })
                        }
                    </div>
                </div>
            );
        }
    })
};