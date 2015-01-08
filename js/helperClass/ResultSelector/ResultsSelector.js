function ResultSelector() {}

ResultSelector.prototype.renderer = function(parent) {
	var item = "";
     	for(var x=0; x<parent.resultOptions.length; x++) {
     		if(parent.resultOptions[x] == parent.itemsToPage) {
     			item += "<option value="+parent.resultOptions[x]+" selected>"+parent.resultOptions[x]+"</option>";
     		} else {
     			item += "<option value="+parent.resultOptions[x]+" >"+parent.resultOptions[x]+"</option>";
     		}
     	}
     	parent.rootElement.getElementsByClassName("favorites-list-items-to-page")[0].innerHTML = item;   
}