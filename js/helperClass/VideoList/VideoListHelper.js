function VideoListHelper() {}

VideoListHelper.prototype.itemMin = function(page, itemsToPage) {
	return (page-1)*itemsToPage;	
}

VideoListHelper.prototype.itemMax = function(page, itemsAll, itemsToPage) {
	if((itemsAll-((page-1)*itemsToPage)) <= itemsToPage) {
		return itemsAll;
	} else {
		return page*itemsToPage;
	}
}

VideoListHelper.prototype.getFavoriteStar = function(parent, i) {
	var favoriteVideos = JSON.parse(localStorage.getItem(parent.rootElementName)).favorites;
	for(var x = 0; x<favoriteVideos.length; x++) {
		if(favoriteVideos[x] === parent.data[i].id) {
			return 'background: url(img/favorites.png); background-size: 80px 40px; background-position: right;';
		}
	} 
	var output = 'background: url(img/favorites.png); background-size: 80px 40px; background-position: left;';
	return output;
}
