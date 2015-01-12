function FavoriteFilter() {} 

FavoriteFilter.prototype.filterDataByFavorites = function(parent) {
	var parseBy = JSON.parse(localStorage.getItem(parent.rootElementName)).favorites;
	console.log(parseBy);
	var output = [];
	for(var x=0; x<parseBy.length; x++) {
		output.push(parent.allData[parseBy[x]]);
		console.log(output);
	}
	return output;
};




