(function(window, document, undefined){

	function App(rootElement, itemsToPage, page, urlData, urlConfig, resultOptions, actualCategory) {
		this.data = [];
		this.allData = [];
		this.rootElementName = rootElement;
		this.rootElement = document.getElementById(rootElement);
		this.itemMin = 0;
		this.itemMax = 0;
		this.itemsToPage = itemsToPage;
		this.page = page;
		this.urlData = urlData;
		this.urlConfig = urlConfig;
		this.resultOptions = resultOptions;
		this.actualCategory = actualCategory;

		this.storageCache = JSON.parse(localStorage.getItem(this.rootElementName));

		this.ajaxLoader = new AjaxLoader();
		this.xmlLoader = new XMLLoader();
		this.articleList = new ArticleList();
		this.videoListHelper = new VideoListHelper();

		this.categoryFilter = new CategoryFilter();
		this.timeFilter = new TimeFilter();
		this.categoryFilter = new CategoryFilter();
		this.favoriteFilter = new FavoriteFilter();
		this.identificationFilter = new IdentificationFilter();

		this.paginator = new Paginator();
		this.resultSelector = new ResultSelector();


		this.favoriteListRenderer = new FavoriteListRenderer();

		this.managerEventHandler = new ManagerEventHandler(this);

		this.desktopAnimations = new DesktopAnimations();
	};

	App.prototype.init = function() {
		var storage = JSON.parse(localStorage.getItem(this.rootElementName));
		if(storage === null) {
			this.storageCache.timestamp = Date.now();
			this.storageCache.favorites = [];
			this.ajaxLoader.load(this.urlData, function(xhr) { 
				this.storageCache.data = JSON.parse(xhr.responseText);
				localStorage.setItem(this.rootElementName, JSON.stringify(this.storageCache));
				this.cacheLoadedData();
			}.bind(this));
		} else if(storage.timestamp+(2*60*1000) > Date.now()) {
			this.storageCache.timestamp = Date.now();
			this.storageCache.favorites = storage.favorites;
			this.ajaxLoader.load(this.urlData, function(xhr) { 
				this.storageCache.data = JSON.parse(xhr.responseText);
				localStorage.setItem(this.rootElementName, JSON.stringify(this.storageCache));
				this.cacheLoadedData();
			}.bind(this));
		} else {
			this.cacheLoadedData();
		}
	};


	App.prototype.cacheLoadedData = function() {
		this.allData = this.identificationFilter.addIdToData(JSON.parse(localStorage.getItem(this.rootElementName)));
		this.data = this.allData;

		this.render();
	};

	App.prototype.render = function() {
		this.articleList.articleRenderer(this);
		this.paginator.paginationRenderer(this);

		this.resultSelector.renderer(this);
		this.favoriteListRenderer.renderSelectList(this);

		this.desktopAnimations.animVideoList(this.rootElementName);
		this.desktopAnimations.itemHover(this.rootElementName);
		this.desktopAnimations.paginationButtonHover(this.rootElementName);
		this.desktopAnimations.paginationPageButtonHover(this.rootElementName);
	};

	var app = new App("videolist", 12, 1, "http://academy.tutoky.com/api/json.php", "http://zadanie.webmedial.eu/config.xml", [8,12,16,20], "All");
	app.init();



}(window, document));