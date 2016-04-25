// var Util = require('./Util');

// class RuneEvents {
//     dispatch () {

//     }

//     listen (Event, callback) {

//     }
// }
    // dispatchRuneEvent: function(name, data) {
    //     var runeEvent = new CustomEvent('runeEvent', { 'detail' : { 'event' : name, 'data' :  data }});
    //     document.dispatchEvent(runeEvent);
    // },
// Event listeners
// function Events(app) {

// 	this.app = app;

// 	var events = this;

// 	this.eventHandlers = {
// 		addPoint : function (data) {
// 			events.app.data.addPoint(data);
// 			events.app.canvas.draw();
// 		},
// 		selectPoint: function (data) {
// 			if(data[0]) {
// 				events.app.data.selectPoint(data[1]);
// 			} else {
//                 events.app.data.deselectPoint(data[1]);
// 			}
//             console.log("Selected points:");
// 			console.log(app.data.activeRune.selectedPoints);
//             events.app.canvas.draw();
// 		},
// 		clearGridPoints : function (e) {
// 			events.app.data.clearRune();
// 			events.app.canvas.draw();
// 		},
// 		preview: function (e) {
// 			events.app.canvas.displayMode = 'preview';
// 		},
// 		deselectAll: function (e) {
// 			events.app.data.activeRune.selectedPoints = [];
// 			events.app.canvas.draw();
// 		},
//         refreshCanvas: function () {
//             events.app.canvas.setupGrid();
//         },
//         redraw : function () {
//             events.app.canvas.draw();
//         }
// 	}
// }

// Events.prototype = {
// 	constructor: Events,
// 	init: function() {
// 		var events = this;

// 		document.addEventListener('runeEvent', function(e) {
// 			console.log('Event received: ' + e.detail.event);
// 			events.eventHandlers[e.detail.event](e.detail.data);

// 		});

//         // Needs fixing
// 		document.addEventListener('keydown', function(e) {
//             if(e.target.tagName !== 'INPUT') {
//     			switch(e.keyCode) {
//     				case 8: //delete
//     					e.preventDefault();
//     					events.app.data.deleteSelected();
//     					events.app.canvas.draw();
//     					util.dispatchRuneEvent('deselectAll');

//     				break;
//     			}
//             }
// 		});
// 	}
// }

let signals = require('signals');

let events = [
    'addPoint',
    'selectPoint',
    'deleteSelected',
    'clearPoints',
    'display',
    'deselectAll',
    'refreshCanvas',
    'redraw',
    'reloadPanels'
];

Events = {};

events.forEach((event) => {
    Events[event] = new signals.Signal();
});

module.exports = Events;




