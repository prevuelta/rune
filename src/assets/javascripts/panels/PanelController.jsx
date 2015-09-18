'use strict';

var React = require('react'),
	Draggable = require('react-draggable');

var util = require('../global/util.js');
var transformPanel = require('./TransformPanel');

function PanelController (data) {

	var panelController = this;

	panelController.data = data;

	console.log(data);

	panelController.panels = [
		{
			title: "Properties",
			properties : [
				{
					label: "Grid units",
					value: data.tablet.gridOptions.units
				},
				{
					label: "Grid resolution",
					value: panelController.data.tablet.gridOptions.res
				}
			]
		},
		{
			title: "Nudge",
			properties: [
				{
					label: "what",
					value: 'wt'
				}
			]
		},
		{
			title: "Transform",
			properties: [
				{
					label: "Points:",
					value: data.activeRune.selectedPoints
				}
			]
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
			        		<div className="handle">{ this.props.options.title }</div>
			        		<div className="panel-content">
			        			{ this.props.options.properties.map(function(property, index) {
			        				return <label><span>{property.label}</span> {property.value}</label>
			        			})}
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