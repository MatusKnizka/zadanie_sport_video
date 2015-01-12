function CategoryEventHandler() {} 

CategoryEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("favorites-category-select")[0].addEventListener("change", function() {
		this.processAfterEvent(parent, parent.rootElement.getElementsByClassName("favorites-category-select")[0].value);
	}.bind(this));

	parent.rootElement.querySelector(".list-body").addEventListener("click", function (e){
		if(e.target.getAttribute("data") !== null) {
			this.processAfterEvent(parent, e.target.getAttribute("data"));
		}     		
	}.bind(this), false);
};

CategoryEventHandler.prototype.processAfterEvent = function(parent, categoryName) {
	if(categoryName === "Favorites") {
		parent.data = parent.favoriteFilter.filterDataByFavorites(parent);
	} else {
		parent.data = parent.categoryFilter.filterDataByCategories(parent.allData, categoryName);
	}
	parent.actualCategory = categoryName;
	parent.render();
};