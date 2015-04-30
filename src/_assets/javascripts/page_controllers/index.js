//= require rune/app

'use strict';

var callback = function() {

	var tablet = new Tablet();

	var rune = new Rune({
		xUnits: 10,
		yUnits: 10,
		xRes: 30,
		yRes: 30,
		canvasId: 'rune-grid',
		padding: 30
	}, paper);

	addView($('#rune-tablet'), 'rune-tablets', {}, null);

}

setupPage([
	{
		"view" : "app",
		"model": {

		},
		
	}], callback
);
