function ResultsEventHandler() {}

ResultsEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("favorites-list-items-to-page")[0].addEventListener("change", function(){
		var itemsToPage = parent.rootElement.getElementsByClassName("favorites-list-items-to-page")[0].value;
		this.processAfterHandler(parent, itemsToPage);
	}.bind(this));
};


ResultsEventHandler.prototype.processAfterHandler = function(parent, itemsToPage) {
	parent.itemsToPage = itemsToPage;
	parent.render();
};


