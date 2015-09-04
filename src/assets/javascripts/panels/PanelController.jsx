'use strict';

var React = require('react'),
	Draggable = require('react-draggable');

var util = require('../global/util.js');
var transformPanel = require('./TransformPanel');

function PanelController (data) {

	var panelController = this;

	console.log(data);

	panelController.panels = [
		{
			template : <p></p>,
			title: "Properties",
			data: {
			}
		},
		{
			template : <p></p>,
			title: "Nudge",
			data: {
			}
		},
		{
			title: "Transform",
			template : <p>Hello world</p>,
			data: {
				res : 0,
				points: data.activeRune.points
			}
		}
	];

	panelController.loadPanels();

}

PanelController.prototype = {
	constructor: PanelController,
	loadPanels: function() {

		var panelController = this;

		var PanelComponent = React.createClass({
			handleStart: function() {

			},
			handleDrag: function() {

			},
			handleStop: function() {

			},
		    render: function() {
		    	var offsetY = this.props.offset * 200;
		        return (
		        	<Draggable
		        		start={{x: 800, y: offsetY }}
		        		onStart={this.handleStart}
		        		>
		        		<div className="panel">
			        		<div className="handle"></div>
			        		<div className="panel-content">
			        			<h4>{ this.props.options.title }</h4>
			        			{ this.props.options.template }
			        			{ this.props.options.data.points }
			        		</div>
		        		</div>
		        	</Draggable>
		        );
		    }
		});

		var Panels = React.createClass({
			render: function() {
				return (
					<div>
					{ this.props.data.map(function(result, index) {
						return <PanelComponent options={result} offset={index} />
					})}
					</div>
				);
			}
		});

		React.render(
		    <Panels data={panelController.panels} />,
		    document.getElementById('rune-panels')
		);

	},
	updateProperties : function(model) {

	}
}

module.exports = PanelController;