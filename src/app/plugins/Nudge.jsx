'use strict';

var React = require('react');
var Keys = require('../global/Keys');

module.exports = function(exposedData) {

    Object.keys({
        'up' : Keys.key.up,
        'down' : Keys.key.down,
        'left' : Keys.key.left,
        'right' : Keys.key.right,
    }).forEach(key => {
        Keys.mapKey(`shiftKey+${Keys.key[key]}`, () => {
            exposedData.addTransformToSelected(directionVectors[key]);
        });
    });

    var directionVectors = {
        'up' : [0,-1],
        'down': [0,1],
        'left' : [-1,0],
        'right' : [1,0]
    };

    var TranslateLink = React.createClass({
        translate: function () {
            exposedData.addTransformToSelected(directionVectors[this.props.direction]);
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

    return {
        title: 'Nudge',
        icon: '',
        collapsed: true,
        panel: React.createClass({
            render: function () {
                return  <div>
                            <TranslateLink direction="left" glyph="←"></TranslateLink>
                            <TranslateLink direction="right" glyph="→"></TranslateLink>
                            <TranslateLink direction="down" glyph="↑"></TranslateLink>
                            <TranslateLink direction="up" glyph="↓"></TranslateLink>
                        </div>;
            }
        })
    };
};