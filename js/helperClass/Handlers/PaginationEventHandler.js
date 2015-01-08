function PaginationEventHandler() {}

PaginationEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("paging-next")[0].addEventListener("click", function(){
		this.processAfterEvent(parent, "next");
	}.bind(this));

	parent.rootElement.getElementsByClassName("paging-previous")[0].addEventListener("click", function(){
		this.processAfterEvent(parent, "prev");
	}.bind(this));

	parent.rootElement.querySelector("#paging-buttons").addEventListener("click", function (e){
     		if(!isNaN(parseInt(e.target.id))) {
     		 	this.processAfterEvent(parent, e.target.id);
     		}
     	}.bind(this), false);
};


PaginationEventHandler.prototype.processAfterEvent = function(parent, buttonType) {
	if(buttonType === "next") {
		parent.page = parent.paginator.nextPage(parent.page, parent.data.length, parent.itemsToPage);
	} else if(buttonType === "prev") {
		parent.page = parent.paginator.previousPage(parent.page);
	} else {
		parent.page = parent.paginator.concretePage(parseInt(buttonType));
	}
	parent.render();
};

