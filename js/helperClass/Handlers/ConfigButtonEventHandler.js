function ConfigButtonEventHandler() {}

ConfigButtonEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("list-favorites")[0].addEventListener("click", function(){
		$("#"+parent.rootElementName).find(".favorites").slideToggle(500);
	});
}