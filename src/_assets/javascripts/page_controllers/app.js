//= require rune/const
//= require rune/util
//= require rune/grid
//= require rune/letter
//= require rune/rune
//= require rune/tablet
//= require rune/actionBar

'use strict';

if(localStorage["rune"]) {
	var tablet = JSON.parse(localStorage["rune"]);
	console.log("Loaded saved tablet");
	console.log(tablet);
} else {
	var tablet = createTablet();
}


var callback = function() {

		// tablet.push(
		// 	rune = new Rune({
		// 		xUnits: 6,
		// 		yUnits: 6,
		// 		xRes: 30,
		// 		yRes: 30,
		// 		canvasId: 'rune-grid',
		// 		padding: 30
		// 	}, paper)
		// );

	addView($('#rune-tablet'), 'rune-tablets', {}, null);

	var actionBar = new ActionBar();

	addView($('header#main-header'), 'rune-actionbar', { "actions" : actionBar.actions}, function() {
		actionBar.init();
	});

}

setupPage([
	{
		view : "app",
		model: {

		},
		
	}], callback
);
