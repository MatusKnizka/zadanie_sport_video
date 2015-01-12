function IdentificationFilter() {}


IdentificationFilter.prototype.addIdToData = function(allData) {
	for(var x = 0;x < allData.data.length; x++) {
			allData.data[x].id = x;
		}
		return allData.data;
};