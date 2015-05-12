//= require rune/editor
//= require rune/events

var app = new RuneEditor({
	toolbarContainer: '',
	actionbarContainer: 'header#main-header',
	tabletContainer: '#rune-tablet',
	canvasId : 'rune-grid'
});


// Events
setupEvents();

