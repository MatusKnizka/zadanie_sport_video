function FavoriteListRenderer() {}

FavoriteListRenderer.prototype.renderer = function(parent) {
	parent.rootElement.getElementsByClassName("favorites-category-select")[0].innerHTML = parent.categoryFilter.filterCategoriesToSelectList(parent.data, parent.actualCategory);
}



