// Event listeners
var events = {
	init: function() {

		document.addEventListener('runeEvent', function(e) {
			console.log('Event received: ' + e.detail.event);
			this.eventHandlers[e.detail.event](e.detail.data);

		});

		document.addEventListener('keydown', function(e) {
			console.log(e.keyCode);
			switch(e.keyCode) {
				case 8: //delete
					e.preventDefault();
					app.data.deleteSelected();
					app.workspace.drawRune(app.data.activeRune);
					
					util.dispatchRuneEvent('deselectAll');

				break;
			}
		});
	},
	eventHandlers : {
		addPoint : function(data) {
			app.data.addPoint(data);
			app.canvas.draw();
		},
		selectPoint: function(data) {
			if(data[0]) {
				app.data.selectPoint(data[1]);
			} else {
				app.data.activeRune.selectedPoints = _.without(app.data.activeRune.selectedPoints, data[1]);
			}
			// console.log(app.tablet.selectedPoints);
		},
		clearGridPoints : function(e) {
			app.data.clearRune();
			// app.workspace.runeView.clearLetterView();
		},
		toggleGrid: function(e) {
			app.workspace.toggleGrid();
		},
		deselectAll: function(e) {
			app.data.activeRune.selectedPoints = [];
		}
	}
}

module.exports = events;




