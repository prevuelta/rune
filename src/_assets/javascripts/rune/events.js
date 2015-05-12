// Event listeners

function setupEvents() {

	document.addEventListener('addPoint', function(e) {

		app.tablet.addLetterPoint(e.detail);
		app.workspace.drawLetter(app.tablet.getActiveRune().letter);

	});

	document.addEventListener('selectPoint', function(e) {

		if(e.detail[0]) {
			app.tablet.selectedPoints.push(e.detail[1]);
		} else {
			app.tablet.selectedPoints = _.without(app.tablet.selectedPoints, e.detail[1]);
		}
		console.log(app.tablet.selectedPoints);

	});

	document.addEventListener('clearGridPoints', function() {

		console.log('done received');
		app.tablet.clearLetter();
		app.workspace.runeView.clearLetterView();
	});

	document.addEventListener('toggleGrid', function() {
		app.workspace.runeView.showGrid = !app.workspace.runeView.showGrid;
		app.workspace.runeView.toggleGrid(app.workspace.runeView.showGrid);
		// if(rune.showGrid) {
		// 	rune.grid.show();
		// } else {
		// 	rune.grid.hide();
		// }
		// rune.redraw();
	});	

	document.addEventListener('keydown', function(e) {
		console.log(e.keyCode);
		switch(e.keyCode) {
			case 32: //delete
				e.preventDefault();
				app.tablet.deleteSelected();
			break;
		}
	});

}