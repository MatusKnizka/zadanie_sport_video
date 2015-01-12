function CategoryFilter() {}

CategoryFilter.prototype.filterDataByCategories = function(allData, parseBy) {
	var output = [];
	if(parseBy !== "All") {
		for(var x=0; x<allData.length; x++) {
			for(i=0; i<allData[x].categories.length; i++) {
				if(parseBy === allData[x].categories[i]) {
					output.push(allData[x]);
					break;
				}
			}
		}
		return output;
	} 
	return allData;
};

CategoryFilter.prototype.filterCategoriesToVideoList = function(categories) {
	var out = document.createDocumentFragment();
	var span;
	var spanText;

	if(categories.length === 0) {
		span = document.createElement("span");
		spanText = document.createTextNode("No categories");	
		span.appendChild(spanText);
		return out.appendChild(span);
	}

	for(var i=0; i<categories.length; i++) {
		span = document.createElement("span");
		span.className = "list-item-shadow-categories";
		span.setAttribute("data", categories[i]);

		if(i+1 === categories.length) {
			spanText = document.createTextNode(categories[i]);	
		} else {
			spanText = document.createTextNode(categories[i]+", ");	
		}

		span.appendChild(spanText);
		out.appendChild(span);
	}
	return out;
};


CategoryFilter.prototype.filterCategoriesToSelectList = function(jsonData, actualCategory) {
	var categories = ['All', 'Favorites'];
	var control = 0;
	var item ="";
	for(x=0; x<jsonData.length; x++) {
		for(i=0; i<jsonData[x].categories.length; i++) {
			for(j=0; j<categories.length; j++) {
				if(jsonData[x].categories[i] !== categories[j]) {
					control = 1;
				} else {
					control = 0;
					break;
				}
			}	
			if(control === 1) {
				categories.push(jsonData[x].categories[i]);
				control = 0;
			}
		}
	}

	for(x=0; x<categories.length; x++) {
		if(categories[x] === actualCategory) {
			item += "<option value="+categories[x]+" selected>"+categories[x]+"</option>";
		} else {
			item += "<option value="+categories[x]+" >"+categories[x]+"</option>";
		}
	}
	return item;
};


