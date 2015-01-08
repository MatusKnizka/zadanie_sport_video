function ResultsEventHandler() {}

ResultsEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("favorites-list-items-to-page")[0].addEventListener("change", function(){
		var itemsToPage = parent.rootElement.getElementsByClassName("favorites-list-items-to-page")[0].value;
		this.processAfterHandler(parent, itemsToPage);
	}.bind(this));
};


ResultsEventHandler.prototype.processAfterHandler = function(parent, itemsToPage) {
	parent.itemsToPage = itemsToPage;
	parent.page = this.maxPages(parent.page, parent.itemsToPage, parent.data.length);
	console.log(itemsToPage);
	parent.render();
};


ResultsEventHandler.prototype.maxPages = function(page, itemsToPage, itemsAll) {
	if(page >= itemsAll/itemsToPage) {
		page = Math.ceil(itemsAll/itemsToPage);
	}
	return page;
};