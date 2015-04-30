// Requires mustache-wax
Mustache.Formatters = {

};

'use strict';

/* ------ Add mustache view ------ */

function addView(container, view, model, callback, replace, prepend) {

	$.get('views/' + view + '.html', function(view) {
		var rendered =  Mustache.render(view, model);
		if(!replace && !prepend) {

			container.append(rendered);

		} else if(prepend) {

			console.log('prepending');

			container.prepend(rendered);

		} else {
			container.html(rendered);
		}
		console.log("view added");
		if(callback){
			callback();
		}
	});
}


/* ------ Add multiple mustache views as callbacks ------ */

function addViews(container, views, outerCallback) {

	function createCallback(view, model, callback) {
		return function() {
			addView(container, view, model, callback, false, false); 
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

var viewContainer = $('#main');

function setupPage(views, outerCallback) {

	var page = {

		onReady : function() {
			
			addViews(viewContainer, views, outerCallback);

		}
	}

	$(document).ready( page.onReady );

}
;
