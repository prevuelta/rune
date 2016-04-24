'use strict';

var Events = require('./Events');

module.exports = function() {
	document.addEventListener('keydown', function(e) {
	    if(e.target.tagName !== 'INPUT') {
			switch(e.keyCode) {
				case 8: //delete
					e.preventDefault();
					Events.deleteSelected.dispatch();
					// events.app.data.deleteSelected();
					// events.app.canvas.draw();
				break;
			}
	    }
	});
}