function ArticleList() {}

ArticleList.prototype.articleRenderer = function(parent) {

	var frag = document.createDocumentFragment();

	parent.rootElement.getElementsByClassName("list-body")[0].innerHTML = "";

	for(var i=parent.videoListHelper.itemMin(parent.page, parent.itemsToPage); i<parent.videoListHelper.itemMax(parent.page, parent.data.length, parent.itemsToPage); i++) {
		var li = document.createElement("li"); 
		li.className = "list-item"; 

		var div = document.createElement("div");
		div.className = "list-item-shadow";

		var span = document.createElement("span");
		span.className = "list-item-shadow-title";

		var video = document.createElement("video");
		video.className = "list-item-video";
		video.controls = true;

		var article = document.createElement("article");
		article.className = "list-item-text";

		var h2 = document.createElement("h2");
		h2.className = "list-item-title";

		var h3 = document.createElement("h3");
		h3.className = "list-item-date";                   

		li.appendChild(div);
		div.appendChild(span);
		li.appendChild(video);
		li.appendChild(article);
		article.appendChild(h2);
		article.appendChild(h3); 
	
		var title = document.createTextNode(parent.data[i]['title']);
		var timestamp = document.createTextNode(parent.timeFilter.timeStampParse(parent.data[i]['timestamp']));
		var videoTitle = parent.categoryFilter.filterCategoriesToVideoList(parent.data[i]['categories']);
		video.setAttribute('style', 'background: url(img/'+this.getImage(parent.data[i]['image'])+'.jpg);background-size: cover;background-position: center center;');

		span.appendChild(videoTitle);  
		h2.appendChild(title);
		h3.appendChild(timestamp);
		frag.appendChild(li);	
	}
	parent.rootElement.getElementsByClassName("list-body")[0].appendChild(frag);
}


ArticleList.prototype.getImage = function(image) {
	if(image == "") {
		return "no-image";
	} else {
		return image;
	}
}