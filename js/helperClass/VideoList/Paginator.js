function Paginator() {}

Paginator.prototype.paginationRenderer = function(parent) {
     	var pageItems = "";
     	var pages = Math.ceil(parent.data.length/parent.itemsToPage);
     	// first page
     	if(parent.page === 1) {
     		parent.rootElement.getElementsByClassName( "paging-previous" )[0].style.visibility = "hidden";
     	} else {
     		parent.rootElement.getElementsByClassName( "paging-previous" )[0].style.visibility = "visible";
     	}

     	// last page
     	if(parent.page === pages) {
     		parent.rootElement.getElementsByClassName( "paging-next" )[0].style.visibility = "hidden";
     	} else {
     		parent.rootElement.getElementsByClassName( "paging-next" )[0].style.visibility = "visible";
     	}

     	if(parent.page > 2) {
     		pageItems += '<div class="paging-pagenum" id="1">1</div>';
     		if(parent.page > 3) {
     			pageItems += "...";
     		}
     	}

     	for( var x=1; x<=pages; x++) {
     		if(x-1 === parent.page) {
     			pageItems += '<div class="paging-pagenum" id="'+x+'" >'+x+'</div>';
     		}

     		if(x === parent.page) {
     			pageItems += '<div class="paging-selected" id="'+x+'">'+x+'</div>';
     		}

     		if(x+1 === parent.page) {
     			pageItems += '<div class="paging-pagenum" id="'+x+'">'+x+'</div>';
     		}
     	}

     	if(parent.page+1 < pages ) {
     		if(parent.page+2 < pages) { pageItems += "..."; } 
     		pageItems += '<div class="paging-pagenum" id="'+pages+'">'+pages+'</div>';
     	}
     	parent.rootElement.getElementsByClassName("paging-buttons")[0].innerHTML = pageItems;
    };

	Paginator.prototype.nextPage = function(page, itemsAll, itemsToPage) {
		if(itemsToPage*page < itemsAll) {
			page++;
		}
		return page;
	};

	Paginator.prototype.previousPage = function(page) {
		if(page > 1) {
			page--;		
		}
		return page;
	};

	Paginator.prototype.concretePage = function(page) {
		return page;
	};

	
