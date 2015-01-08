function FavoriteEventHandler() {} 

FavoriteEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("favorites-category-select")[0].addEventListener("change", function() {
		this.processAfterEvent(parent, parent.rootElement.getElementsByClassName("favorites-category-select")[0].value);
	}.bind(this));
};

FavoriteEventHandler.prototype.processAfterEvent = function(parent, categoryName) {
	parent.data = parent.categoryFilter.filterDataByCategories(parent.allData, categoryName);
	parent.render();
};