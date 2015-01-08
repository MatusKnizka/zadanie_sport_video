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
