function ConfigButtonEventHandler() {}

ConfigButtonEventHandler.prototype.eventHandler = function(parent) {
	parent.rootElement.getElementsByClassName("list-favorites")[0].addEventListener("click", function(){
		$(".favorites").fadeToggle(500);
	});
}