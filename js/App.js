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


		this.ajaxLoader = new AjaxLoader();
		this.xmlLoader = new XMLLoader();
		this.articleList = new ArticleList();
		this.videoListHelper = new VideoListHelper();

		this.categoryFilter = new CategoryFilter();
		this.timeFilter = new TimeFilter();
		this.categoryFilter = new CategoryFilter();

		this.paginator = new Paginator();
		this.resultSelector = new ResultSelector();

		this.favoriteListRenderer = new FavoriteListRenderer();

		this.configButtonEventHandler = new ConfigButtonEventHandler();
		this.paginationEventHandler = new PaginationEventHandler();
		this.resultEventHandler = new ResultsEventHandler();
		this.favoriteEventHandler = new FavoriteEventHandler();

		this.desktopAnimations = new DesktopAnimations();
	};

	App.prototype.init = function() {
		this.ajaxLoader.load(this.urlData, function(xhr) { 
			this.cacheLoadedData(xhr.responseText); 
			this.initConfig();
		}.bind(this));

		this.paginationEventHandler.eventHandler(this);
		this.configButtonEventHandler.eventHandler(this);
		this.resultEventHandler.eventHandler(this);
		this.favoriteEventHandler.eventHandler(this);
	};

	App.prototype.initConfig = function() {
		this.resultSelector.renderer(this);
		this.favoriteListRenderer.renderSelectList(this);
	};

	App.prototype.cacheLoadedData = function(data) {
		this.data = JSON.parse(data);
		this.allData = JSON.parse(data);
		this.itemMin = this.videoListHelper.itemMin(this.page, this.itemsToPage);
		this.itemMax = this.videoListHelper.itemMax(this.page, this.data.length, this.itemsToPage);

		this.render();
	};

	App.prototype.render = function() {
		this.articleList.articleRenderer(this);
		this.paginator.paginationRenderer(this);

		this.desktopAnimations.animVideoList(this.rootElementName);
		this.desktopAnimations.itemHover(this.rootElementName);
		this.desktopAnimations.paginationButtonHover(this.rootElementName);
		this.desktopAnimations.paginationPageButtonHover(this.rootElementName);
	};

	var app = new App("videolist", 12, 1, "http://academy.tutoky.com/api/json.php", "http://zadanie.webmedial.eu/config.xml", [8,12,16,20], "All");
	app.init();

}(window, document));