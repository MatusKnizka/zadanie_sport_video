function XMLLoader() {}

XMLLoader.prototype.load = function(url, callback) {
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	} else {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("GET", url,false);
	xmlhttp.send();
	callback(xmlhttp.responseXML); 
} 