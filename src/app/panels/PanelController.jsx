'use strict';

var util = require('../global/util.js');
var React = require('react'),
    Draggable = require('react-draggable');

var transformPanel = require('./transform/TransformPanel');
var getGridPanelComponent = require('./grid/GridPanelComponent.jsx');


function PanelController (data) {

    this.data = data;

	var panelController = this;

	panelController.panels = [
		{
			title: "Grid",
            panelType: "grid",
            data: data.tablet.gridOptions
        }
		// {
		// 	title: "Nudge",
		// 	properties: [
		// 		{
		// 			label: "what",
		// 			value: 'wt'
		// 		}
		// 	]
		// },
		// {
		// 	title: "Transform",
		// 	properties: [
		// 		{
		// 			label: "Points:",
		// 			value: data.activeRune.selectedPoints
		// 		}
		// 	]
		// }
	];

    // panelController.data.activeRune.selectedPoints = [];

    // console.log("probs bra: " + panelController.panels[2].properties[0].value);

	panelController.loadPanels();

}

PanelController.prototype = {
	constructor: PanelController,
	loadPanels: function() {

		var panelController = this;

        // var HelloMessage = React.createClass({
        //     getInitialState: function() {
        //         return {name: test.name};
        //     },
        //     render: function() {
        //         return (<div onClick={this.handleChange}>Hello {this.state.name} </div>);
        //     },
        //     handleChange: function() {
        //     console.log("woink");
        //         this.setState({name: test.name});
        //     }
        // });

        // React.render(<HelloMessage name={test.name} />,
        //     document.getElementById('rune-panels'));

        // test.name = 'not seb';

		// var PanelComponent = React.createClass({
		// 	handleStart: function() {

		// 	},
		// 	handleDrag: function() {

		// 	},
		//     render: function() {
		//     	var offsetY = this.props.offset * 200;
		//         return (
		//         	<Draggable
		//         		start={{x: 800, y: offsetY }}
		//         		onStart={this.handleStart}
		//         		>
		//         		<div className="panel">
		// 	        		<div className="handle">{ this.props.options.title }</div>
		// 	        		<div className="panel-content">
		// 	        			{ this.props.options.properties.map(function(property, index) {
		// 	        				return <label><span>{property.label}</span> {property.value}</label>
		// 	        			})}
		// 	        		</div>
		//         		</div>
		//         	</Draggable>
		//         );
		//     }
		// });

		var PanelWrapper = React.createClass({
            handleStart: function() {

            },
            handleDrag: function() {

            },
			render: function() {
                var offsetY = this.props.offset * 200;
                return (
                    <Draggable
                        start={{x: 800, y: offsetY }}
                        onStart={this.handleStart}
                        handle=".handle"
                        >
                        <div className="panel">
                            <div className="handle">{ this.props.options.title }</div>
                            <div className="panel-content">
                                { this.props.children }
                            </div>
                        </div>
                    </Draggable>
				);
			}
		});

// var GridPanelComponent = React.createClass({
//     handleStart: function() {

//     },
//     handleDrag: function() {

//     },
//     render: function() {
//         var offsetY = this.props.offset * 200;
//         return (
//             <Draggable
//                 start={{x: 800, y: offsetY }}
//                 onStart={this.handleStart}
//                 >
//                 <div className="panel">
//                     <div className="handle">{ this.props.options.title }</div>
//                     <div className="panel-content">
//                         { this.props.options.properties.map(function(property, index) {
//                             return <label><span>{property.label}</span> {property.value}</label>
//                         })}
//                     </div>
//                 </div>
//             </Draggable>
//         );
//     }
// });

        var GridPanelComponent = getGridPanelComponent(panelController.data.tablet.gridOptions);

		React.render(
		    <PanelWrapper offset={0} options={{title : 'Grid'}} >
                <GridPanelComponent />
            </PanelWrapper>,
		    document.getElementById('rune-panels')
		);

        console.log(panelController.panels);

	},
	updateProperties : function(model) {

	}
}

module.exports = PanelController;