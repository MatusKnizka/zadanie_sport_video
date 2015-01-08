function DesktopAnimations() {}

// ANIMATION FUNCTIONS

DesktopAnimations.prototype.itemHover = function(rootElement) {
	$("."+rootElement).find(".list-item-shadow").fadeOut();
	$("."+rootElement).find(".list-item-shadow-title").slideUp();

	$("."+rootElement).find(".list-item").mouseenter(function(){
		var index = $(this).index();
		$("."+rootElement).find(".list-item-shadow").eq(index).fadeIn(150, function(){
			$("."+rootElement).find(".list-item-shadow-title").eq(index).slideDown(200);
		});
	});

	$("."+rootElement).find(".list-item").mouseleave(function(){
		var index = $(this).index();
		$(".list-item-shadow-title").eq(index).slideUp(500, function(){
			$("."+rootElement).find(".list-item-shadow").eq(index).fadeOut(300);
		});
	});
};

DesktopAnimations.prototype.paginationButtonHover = function(rootElement) {
	$("."+rootElement).find(".button").mouseenter(function(){
		$(this).fadeOut(100, function(){
			$(this).css('background-color', '#2162A6');
			$(this).fadeIn(100);
		});
	});

	$("."+rootElement).find(".button").mouseleave(function(){
		$(this).fadeOut(100, function(){
			$(this).css('background-color', '#5aa1ec');
			$(this).fadeIn(100);
		});
	});
};

DesktopAnimations.prototype.paginationPageButtonHover = function(rootElement) {
	$("."+rootElement).find(".paging-pagenum").mouseenter(function(){
		$(this).fadeOut(100, function(){
			$(this).css('background-color', '#2162A6');
			$(this).fadeIn(100);
		});
	});

	$("."+rootElement).find(".paging-pagenum").mouseleave(function(){
		$(this).fadeOut(100, function(){
			$(this).css('background-color', '#5aa1ec');
			$(this).fadeIn(100);
		});
	});
};


DesktopAnimations.prototype.animVideoList = function(rootElement) {
	$("."+rootElement).find(".list-item").fadeOut(1, function(){
		$("."+rootElement).find(".list-item").fadeIn(500);
	});
};


