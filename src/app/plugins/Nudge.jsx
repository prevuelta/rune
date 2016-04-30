'use strict';

var React = require('react');
var Keys = require('../global/Keys');


var TranslateLink = React.createClass({
    translate: function () {
        debugger;
        this.props.data.handler(directionVectors[this.props.direction]);
    },
    render: function() {
        return <span 
            onClick={this.translate} 
            data-direction="{this.props.direction}" 
            className="tool">
                {this.props.glyph}
            </span>
    }
});

module.exports = {
    title: 'Nudge',
    icon: '',
    collapsed: true,
    panel: React.createClass({
        handler : function () {
            return this.props.data.addTransformToSelected;
        },
        render: function () {
            return  <div>
                        <TranslateLink handler={this.handler} direction="left" glyph="←"></TranslateLink>
                        <TranslateLink handler={this.handler} direction="right" glyph="→"></TranslateLink>
                        <TranslateLink handler={this.handler} direction="down" glyph="↑"></TranslateLink>
                        <TranslateLink handler={this.handler} direction="up" glyph="↓"></TranslateLink>
                    </div>;
        }
    })
};