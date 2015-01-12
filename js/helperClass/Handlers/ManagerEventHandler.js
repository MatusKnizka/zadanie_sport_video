function ManagerEventHandler(parent) {
	this.parent = parent;
	this.initHandlers();
}

ManagerEventHandler.prototype.initHandlers = function() {
	this.configButtonEventHandler = new ConfigButtonEventHandler();
	this.paginationEventHandler = new PaginationEventHandler();
	this.resultEventHandler = new ResultsEventHandler();
	this.categoryEventHandler = new CategoryEventHandler();
	this.favoriteEventHandler = new FavoriteEventHandler();

	this.paginationEventHandler.eventHandler(this.parent);
	this.configButtonEventHandler.eventHandler(this.parent);
	this.resultEventHandler.eventHandler(this.parent);
	this.categoryEventHandler.eventHandler(this.parent);
	this.favoriteEventHandler.eventHandler(this.parent);
}
