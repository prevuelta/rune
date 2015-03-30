
'use strict';

var viewContainer = $('#main');

/* ------ Add mustache view ------ */

function addView(template, model, callback, replace, prepend) {
	// Form view

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

function addViews(views, container, outerCallback) {

	function createCallback(name, model, container, callback) {
		return function() {
			addView(name, model, container, callback); 
		}
	}

	var callback = outerCallback;

	$(views).each(function(index, value) {
		callback = createCallback(value[0], value[1], container, callback);
	});


	if(callback != null) {
		callback();
	}
}



function setupPage(views) {

	var page = {

		onReady : function() {
			
			$.each(views, function(key, value) {
				addView(key, value.data, value.callback);
			});	

		}
	}

	$(document).ready( page.onReady );

}