
'use strict';

var viewContainer = $('#main');

/* ------ Add mustache view ------ */

function addView(template, model, callback, replace, prepend) {
	// Form view

	console.log('Prepend: ' + prepend);

	$.get('templates/' + template + '.html', function(template) {
		var rendered =  Mustache.render(template, model);
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

	function createCallback(template, model, callback) {
		return function() {
			addView(template, model, callback, false, false); 
		}
	}

	var callback = outerCallback;

	$.each(views, function(key, value) {
		callback = createCallback(value.template, value.data, callback);
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