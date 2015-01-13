	function CacheLoader() {}

	CacheLoader.prototype.load = function(rootElementName, urlData, callback, ajaxLoaderCall) {
		var storage = localStorage.getItem(rootElementName);
		if(storage === null) {
			storage = {};
			storage.timestamp = 0;
			storage.favorites = [];
			storage.data = [];
			localStorage.setItem(rootElementName, JSON.stringify(storage));
		} 
		storage = JSON.parse(localStorage.getItem(rootElementName));
		if(storage.timestamp+(2*60*1000) < Date.now()) {
			storage.timestamp = Date.now();
			storage.favorites = storage.favorites;

			ajaxLoaderCall.load(urlData, function(xhr) { 
				storage.data = JSON.parse(xhr.responseText);
				localStorage.setItem(rootElementName, JSON.stringify(storage));
				callback();
			}.bind(this));

		} else {
			callback();
		}
	}
