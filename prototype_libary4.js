

const CLASS_NAME_PAGING_PREVIOUS = "paging-previous";
const CLASS_NAME_PAGING_NEXT = "paging-next";
const CLASS_NAME_CATEGORY_SELECT = "favorites-category-select";
const CLASS_NAME_PAGING_LOAD_MORE = "load-button";
const CLASS_NAME_PAGING_ITEMS_TO_PAGE_SELECT = "favorites-list-items-to-page";
const CLASS_NAME_FAVORITES_ENABLE_BUTTON = "favorites-enable-button";




var App = function(htmlScope, url, page, itemsToPage, media, selectedCategory) {
	this.Config.XMLData.name = htmlScope;
	this.Config.XMLData.rootElement = document.getElementById(htmlScope);
	this.Config.XMLData.url = url;
	this.Config.XMLData.page = page;
	this.Config.XMLData.itemsToPage = itemsToPage;
	this.Config.XMLData.categories = [];
	this.Config.XMLData.media = media;
	this.Config.XMLData.allData = [];
	this.Config.XMLData.data = [];
	this.Config.XMLData.itemStart = 1;
	this.Config.XMLData.itemEnd =  this.Config.XMLData.itemsToPage;
	this.Config.XMLData.selectedCategory = selectedCategory;
	var self = this;

	this.FunctHandlers.PaginationEventHandler.next( this );
	this.FunctHandlers.PaginationEventHandler.prev( this );
	this.Config.XMLLoader.load( this );
};

App.prototype.Config = {

	XMLLoader: {
		load: function( parent ) {
			parent.CacheLoader.AjaxLoader.load( parent.Config.XMLData.url, [], parent.Config.XMLLoader.processResponse );
		},

		processResponse: function(xhr) {
			console.log(xhr.responseText);
			XMLData.data = JSON.parse(xhr.responseText);
		}
	},

	XMLData: {
		//constructor
	}
};

App.prototype.CacheLoader = {
	AjaxLoader: {
		load: function(url, params, callback) {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = ensureReadiness; 
			function ensureReadiness() {
				if(xhr.readyState < 4) {
					return;
				}  
				if(xhr.status !== 200) {
					return;
				}  
				if(xhr.readyState === 4) {
					callback(xhr);
				}           
			}     
			xhr.open('GET', url, true);
			xhr.send('');
		}
	}
};

App.prototype.VideoList = {
	ArticleList: {
		ArticleRenderer: {
			_renderVideoList: function() {
				var frag = document.createDocumentFragment();

				this.rootElement.getElementsByClassName("list-body")[0].innerHTML = "";

				for(var i=this.itemStart; i<this.itemEnd; i++) {
					var li = document.createElement("li"); 
					li.className = "list-item"; 

					var div = document.createElement("div");
					div.className = "list-item-shadow";

					var favorite = document.createElement("span");
					favorite.className = "list-item-shadow-favorite";

					favorite.setAttribute("data-fav", i);

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
					div.appendChild(favorite);
					div.appendChild(span);
					li.appendChild(video);
					li.appendChild(article);
					article.appendChild(h2);
					article.appendChild(h3); 

					var favoriteText = document.createTextNode(FavoriteHelper.textToItem(i));
					var title = document.createTextNode(this.data[i]['title']);
					var timestamp = document.createTextNode(DateTimeHelper.timestampParse(this.data[i]['timestamp']));
					var videoTitle = WriteHelper.getCategories(this.data[i]['categories']);
					video.setAttribute('style', 'background: url('+WriteHelper.getImage(this.data[i]['image'])+'.jpg);background-size: cover;background-position: center center;');

					favorite.appendChild(favoriteText);
					span.appendChild(videoTitle);  
					h2.appendChild(title);
					h3.appendChild(timestamp);
					frag.appendChild(li);	
				}

				this.rootElement.getElementsByClassName("list-body")[0].appendChild(frag);
			}
		}
	},

	Paginator: {
		PaginatorRenderer: {
			_renderPagination: function() {
				var pageItems = "";
				var pages = Math.ceil(this.data.length/this.itemsToPage);
     			// first page
     			if(this.page === 1) {
     				this.rootElement.getElementsByClassName( CLASS_NAME_PAGING_PREVIOUS )[0].style.visibility = "hidden";
     			} else {
     				this.rootElement.getElementsByClassName( CLASS_NAME_PAGING_PREVIOUS )[0].style.visibility = "visible";
     			}

     			// last page
     			if(this.page === pages) {
     				this.rootElement.getElementsByClassName( CLASS_NAME_PAGING_NEXT )[0].style.visibility = "hidden";
     			} else {
     				this.rootElement.getElementsByClassName( CLASS_NAME_PAGING_NEXT )[0].style.visibility = "visible";
     			}

     			if(this.page > 2) {
     				pageItems += '<div class="paging-pagenum" id="1">1</div>';
     				if(this.page > 3) {
     					pageItems += "...";
     				}
     			}

     			for( var x=1; x<=pages; x++) {
     				if(x-1 === this.page) {
     					pageItems += '<div class="paging-pagenum" id="'+x+'" >'+x+'</div>';
     				}

     				if(x === this.page) {
     					pageItems += '<div class="paging-selected" id="'+x+'">'+x+'</div>';
     				}

     				if(x+1 === this.page) {
     					pageItems += '<div class="paging-pagenum" id="'+x+'">'+x+'</div>';
     				}
     			}

     			if(this.page+1 < pages ) {
     				if(this.page+2 < pages) { 
     					pageItems += "..."; 
     				} 
     				pageItems += '<div class="paging-pagenum" id="'+pages+'">'+pages+'</div>';
     			}
     			this.rootElement.getElementsByClassName("paging-buttons")[0].innerHTML = pageItems;
     		}
     	}
     }
 };


 App.prototype.FavoriteList = {
 	FavoriteListRenderer: {
 		test: function() {
 			alert("bbb");
 		}
 	}
 };


 App.prototype.ResultSelector = {
 	ResultRenderer: {

 	}
 };


 App.prototype.CategoryList = {
 	CategoryListRenderer: {

 	}
 };


 App.prototype.Filters = {
 	ArticleFilter: {

 	},
 	CategoryFilter: {

 	}
 };


 App.prototype.FunctHandlers = {
 	ArticleEventHandler: {

 	},
 	CategoryEventHandler: {

 	},
 	FavoriteEventHandler: {

 	},
 	ResultsEventHandler: {
 		
 	},
 	PaginationEventHandler: {
 		next: function( parent ){
 			document.getElementsByClassName( CLASS_NAME_PAGING_NEXT )[0].addEventListener("click", function(){ 
 				parent.FavoriteList.FavoriteListRenderer.test();
 			});
 		},
 		prev: function( parent ){
 			document.getElementsByClassName( CLASS_NAME_PAGING_PREVIOUS )[0].addEventListener("click", function(){ 
 				parent.FavoriteList.FavoriteListRenderer.test();
 			});
 		},
 		button: function( parent ){
 			this.rootElement.querySelector("#paging-buttons").addEventListener("click", function (e){
 				parent.FavoriteList.FavoriteListRenderer.test();
 				//if(!isNaN(parseInt(e.target.id))) {
 					//this.changePage(parseInt(e.target.id));
 				//}
 			}, false);
 		}

 	}
 };


 const PAGE = 1;
 const ITEM_TO_PAGE = 12;
 const CATEGORY = 'All';
 const XML_URL = "http://academy.tutoky.com/api/json.php";
 const HTML_SCOPE = "videolist";
 const SELECTED_CATEGORY = "All";

 var m = new App(HTML_SCOPE, XML_URL, PAGE, ITEM_TO_PAGE, CATEGORY, SELECTED_CATEGORY);


