var util = require('./util');
var _ = require('lodash');

// Event listeners
function Events(app) {

	this.app = app;

	var events = this;

	this.eventHandlers = {
		addPoint : function (data) {
			events.app.data.addPoint(data);
			events.app.canvas.draw();
		},
		selectPoint: function (data) {
			if(data[0]) {
				events.app.data.selectPoint(data[1]);
			} else {
                events.app.data.deselectPoint(data[1]);
			}
            console.log(data);
			console.log(app.data.activeRune.selectedPoints);
		},
		clearGridPoints : function (e) {
			events.app.data.clearRune();
			events.app.canvas.draw();
		},
		preview: function (e) {
			events.app.canvas.displayMode('preview');
		},
		deselectAll: function (e) {
			events.app.data.activeRune.selectedPoints = [];
			events.app.canvas.draw();
		},
        refreshCanvas: function () {
            events.app.canvas.setupGrid();
        },
        redraw : function () {
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

        // Needs fixing
		document.addEventListener('keydown', function(e) {
			console.log(e.target.tagName);
            if(e.target.tagName !== 'INPUT') {
    			switch(e.keyCode) {
    				case 8: //delete
    					e.preventDefault();
    					events.app.data.deleteSelected();
    					events.app.canvas.draw();
    					util.dispatchRuneEvent('deselectAll');

    				break;
    			}
            }
		});
	}
}

module.exports = Events;




