'use strict';

//= require ../rune/app

var callback = function() {

	var tablet = new Tablet();

	var rune = new Rune({
		xUnits: 6,
		yUnits: 6,
		xRes: 40,
		yRes: 40,
		canvasId: 'rune-grid',
		padding: 30
	}, paper);

	rune.addLetter();

	addView($('#rune-tablet'), 'rune-tablets', {}, null);

}

setupPage([
	{
		"view" : "app",
		"model": {

		},
		
	}], callback
);
