'use strict';

let Events = require('../global/Events');

let React = require('react');
let paper = require('paper');

// React components:
let Dialogue = require('../components/Dialogue.jsx');
let Button = require('../components/Button.jsx');

class ActionBar {
    constructor () {
    }

    loadApp (app) {

    	var actionBar = this;
    	actionBar.app = app;

    	this.actions = [
    		{
    			id : "clear",
    			title : "Clear",
    			action: function(e) {
    				e.preventDefault();
    				// Util.dispatchRuneEvent("clearGridPoints");
                    Events.clearPoints.dispatch();
    			}
    		},
    		{
    			id: "grid",
    			title: "Preview",
    			action: function(e) {
    				e.preventDefault();
                    Events.display.dispatch();
    			}
    		},
    		{
    			id: "svg",
    			title: "Export as SVG",
    			action: function(e) {
    				e.preventDefault();

                    Events.renderSVG.dispatch();

                    let element = document.getElementById('rune-overlay');

                    let dialogue = React.render(
                        <Dialogue
                            element={element}
                            title="Copy SVG code">
                            <textarea>{ actionBar.app.data.tablet.renderedSVG }</textarea>
                        </Dialogue>,
                        element
                    );

    				// svgo.optimize(svgString, (result) => {
                    // });

                    // actionBar.app.canvas.displayMode = 'preview';
                    // console.log("here");

    				// let svgString = paper.project.exportSVG({asString: true, layerIndex: 1}});

    				// var link = document.createElement("a");
                    // console.log("and here");
    				// link.download = 'rune_export.svg';
    				// link.href = url;
    				// link.click();
                    // actionBar.app.canvas.displayMode = 'working';
                    // var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
    		  }
    		}
    	];

	   this.render();
	   this.addEvents();
    }

    addEvents (container) {
    	for (var i=0; i < this.actions.length; i++) {
    		var action = this.actions[i];
    		document.querySelectorAll('[data-action="' + action.id + '"]')[0].onclick = action.action;
    	}
    };

    render () {
    	var actions = this.actions;
    	var ActionBarComponent = React.createClass({
    	    render: function() {
    	        return (
    				<ul>
                        <li><span>Rüne</span></li>
    					{
    						this.props.actions.map(function(action, i) {
    							return <li key={action.id}>
                                    <a
                                        className="action"
                                        data-action={ action.id }>
                                        { action.title }
                                    </a>
                                </li>;
    						})
    					}
    				</ul>
    	        );
    	    }
    	});

    	React.render(
    	    <ActionBarComponent actions={actions} />,
    	    document.getElementById('rune-actionbar')
    	);
    }
}

module.exports = new ActionBar();