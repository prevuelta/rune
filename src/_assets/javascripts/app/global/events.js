// Event listeners

function setupEvents() {

	document.addEventListener('runeEvent', function(e) {
		console.log('Event received: ' + e.detail.event);
		eventHandlers[e.detail.event](e.detail.data);

	});

	document.addEventListener('keydown', function(e) {
		console.log(e.keyCode);
		switch(e.keyCode) {
			case 8: //delete
				e.preventDefault();
				app.tablet.deleteSelected();
				app.workspace.drawLetter(app.tablet.getActiveRune().letter);
				
				util.dispatchRuneEvent('deselectAll');

			break;
		}
	});

}

var eventHandlers = {
	addPoint : function(data) {
		app.tablet.addLetterPoint(data);
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);
	},
	selectPoint: function(data) {
		if(data[0]) {
			app.tablet.selectPoint(data[1]);
		} else {
			app.tablet.getActiveRune().letter.selectedPoints = _.without(app.tablet.getActiveRune().letter.selectedPoints, data[1]);
		}
		// console.log(app.tablet.selectedPoints);
	},
	clearGridPoints : function(e) {
		app.tablet.clearLetter();
		app.workspace.runeView.clearLetterView();
	},
	toggleGrid: function(e) {
		app.workspace.toggleGrid();
	},
	deselectAll: function(e) {
		app.tablet.getActiveRune().letter.selectedPoints = [];
	}
}





