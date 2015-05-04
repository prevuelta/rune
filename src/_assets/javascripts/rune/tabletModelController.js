/* ========== Tablet ========== */


function TabletModelController() {

	this.runes = [];
	this.activeRuneIndex = 0;

}

TabletModelController.prototype.getActiveRune = function() {
	if(typeof this.runes[this.activeRuneIndex] === 'undefined') {
		return null;
	} else {
		return this.runes[this.activeRuneIndex];
	}
}

TabletModelController.prototype.addRune = function() {
	this.runes.push(new RuneModel());
}

TabletModelController.prototype.delRune = function() {

}