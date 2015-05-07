//= require rune/runeModel

/* ========== Tablet ========== */


function TabletModelController(tabletModel) {

	if(tabletModel) {
		this.model = tabletModel;
	} else {
		this.newTabletModel();
	}
	this.activeRuneIndex = 0;

}

TabletModelController.prototype = {
	newTabletModel : function() {
		this.model = {
			runes : []
		};
		this.addRune();
	},
	getActiveRune : function() {
		if(typeof this.model.runes[this.activeRuneIndex] === 'undefined') {
			this.addRune();
		}

		return this.model.runes[this.activeRuneIndex];
	},
	addRune : function() {
		console.log("Adding rune");
		console.log(this.model);
		this.model.runes.push(new RuneModelController(new RuneModel()) );
	},
	delRune : function() {

	}
}