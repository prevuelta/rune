var util = require('./util');

// Event listeners
function Events(app) {

	this.app = app;

	var events = this;

	this.eventHandlers = {
		addPoint : function(data) {
			events.app.data.addPoint(data);
			events.app.canvas.draw();
		},
		selectPoint: function(data) {
			if(data[0]) {
				events.app.data.selectPoint(data[1]);
			} else {
				events.app.data.activeRune.selectedPoints = _.without(app.data.activeRune.selectedPoints, data[1]);
			}
			// console.log(app.tablet.selectedPoints);
		},
		clearGridPoints : function(e) {
			events.app.data.clearRune();
			events.app.canvas.draw();
		},
		toggleGrid: function(e) {
			events.app.canvas.toggleGrid();
		},
		deselectAll: function(e) {
			events.app.data.activeRune.selectedPoints = [];
			events.app.canvas.draw();
		}
	}
}

Events.prototype = {
	constructor: Events,
	init: function() {
		var events = this;

		document.addEventListener('runeEvent', function(e) {
			console.log('Event received: ' + e.detail.event);
			events.eventHandlers[e.detail.event](e.detail.data);

		});

		document.addEventListener('keydown', function(e) {
			console.log(e.keyCode);
			switch(e.keyCode) {
				case 8: //delete
					e.preventDefault();
					events.app.data.deleteSelected();
					events.app.canvas.draw();
					util.dispatchRuneEvent('deselectAll');

				break;
			}
		});
	}
}

module.exports = Events;




