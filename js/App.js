(function(window, document, undefined){

	function App(rootElement, itemsToPage, page, urlData, resultOptions, actualCategory) {
		this.data = [];
		this.allData = [];
		this.rootElementName = rootElement;
		this.rootElement = document.getElementById(rootElement);
		this.itemMin = 0;
		this.itemMax = 0;
		this.itemsToPage = itemsToPage;
		this.page = page;
		this.urlData = urlData;
		this.resultOptions = resultOptions;
		this.actualCategory = actualCategory;

		this.ajaxLoader = new AjaxLoader();
		this.cacheLoader = new CacheLoader();
		this.articleList = new ArticleList();
		this.videoListHelper = new VideoListHelper();

		this.categoryFilter = new CategoryFilter();
		this.timeFilter = new TimeFilter();
		this.categoryFilter = new CategoryFilter();
		this.favoriteFilter = new FavoriteFilter();
		this.identificationFilter = new IdentificationFilter();

		this.paginator = new Paginator();
		this.categoryListRenderer = new CategoryListRenderer();

		this.favoriteListRenderer = new FavoriteListRenderer();
		this.managerEventHandler = new ManagerEventHandler(this);

		this.desktopAnimations = new DesktopAnimations();
	};

	App.prototype.init = function() {
		this.cacheLoader.load(this.rootElementName, this.urlData, function(){ this.loadData(); }.bind(this), this.ajaxLoader);
	};


	App.prototype.loadData = function() {
		this.allData = this.identificationFilter.addIdToData(JSON.parse(localStorage.getItem(this.rootElementName)));
		this.data = this.allData;

		this.render();
	};

	App.prototype.render = function() {
		this.page = this.videoListHelper.maxPages(this.page, this.itemsToPage, this.data.length);
		
		this.articleList.articleRenderer(this);
		this.paginator.paginationRenderer(this);

		this.categoryListRenderer.renderer(this);
		this.favoriteListRenderer.renderer(this);

		this.desktopAnimations.animVideoList(this.rootElementName);
		this.desktopAnimations.itemHover(this.rootElementName);
		this.desktopAnimations.paginationButtonHover(this.rootElementName);
		this.desktopAnimations.paginationPageButtonHover(this.rootElementName);
	};

	var app = new App("videolist", 12, 1, "http://academy.tutoky.com/api/json.php",  [8,12,16,20], "All");
	app.init();

	var app1 = new App("videolist1", 12, 1, "http://academy.tutoky.com/api/json.php",  [8,12,16,20], "All");
	app1.init();


}(window, document));