
'use strict';

var viewContainer = $('#main');

/* ------ Add mustache view ------ */

function addView(view, model, callback, replace, prepend) {
	// Form view

	console.log('Prepend: ' + prepend);

	$.get('views/' + view + '.html', function(view) {
		var rendered =  Mustache.render(view, model);
		if(!replace && !prepend) {

			viewContainer.append(rendered);

		} else if(prepend) {

			console.log('prepending');

			viewContainer.prepend(rendered);

		} else {
			viewContainer.html(rendered);
		}
		console.log("view added");
		if(callback){
			callback();
		}
	});
}


/* ------ Add multiple mustache views as callbacks ------ */

function addViews(views, outerCallback) {

	function createCallback(view, model, callback) {
		return function() {
			addView(view, model, callback, false, false); 
		}
	}

	var callback = outerCallback;

	$.each(views, function(key, value) {
		callback = createCallback(value.view, value.data, callback);
	});

	if(callback != null) {
		callback();
	}
}


function setupPage(views, outerCallback) {

	var page = {

		onReady : function() {
			
			addViews(views, outerCallback);

		}
	}

	$(document).ready( page.onReady );

}