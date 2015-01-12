function FavoriteEventHandler() {}

FavoriteEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.querySelector(".list-body").addEventListener("click", function (e){
		if(e.target.getAttribute("data-fav") !== null) {
			this.afterEvent(parseInt(e.target.getAttribute("data-fav")), parent);
		} 		
	}.bind(this), false);
};


FavoriteEventHandler.prototype.afterEvent = function(itemId, parent) {
	localStorage.setItem(parent.rootElementName, JSON.stringify(this.toLocalStorage(itemId, parent)));
	parent.rootElement.getElementsByClassName("list-item-shadow-favorite")[itemId%parent.itemsToPage].style.backgroundPosition = this.changeStar(itemId, parent);
};


FavoriteEventHandler.prototype.toLocalStorage = function(itemId, parent) {
	var favoriteVideos = JSON.parse(localStorage.getItem(parent.rootElementName));
	for(var i=0; i<favoriteVideos.favorites.length; i++) {
		if(favoriteVideos.favorites[i] === itemId) {
			favoriteVideos.favorites.splice(i, 1);
			return favoriteVideos;
		} 
	}
	favoriteVideos.favorites.push(itemId);
	return favoriteVideos;
};

FavoriteEventHandler.prototype.changeStar = function(itemId, parent) {
	var favoriteVideos = JSON.parse(localStorage.getItem(parent.rootElementName));
	for(var i=0; i<favoriteVideos.favorites.length; i++) {
		if(favoriteVideos.favorites[i] === itemId) {
			return "right";
		} 
	}
	return "left";
};





