//= require app/pages/EditorPage

var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-view'
});


// Events
setupEvents();
