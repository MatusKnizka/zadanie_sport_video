

var MyApp = (function(window, document){




	var ajax = {};
	var JSONObject;

	ajax.loadJSON = function(url)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				JSONObject = JSON.parse(xmlhttp.responseText);
			ajax.callback(JSONObject); // callback
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.send();
}

ajax.callback = function(JSONObject) // callback funkcia - ulozenie json suboru do objektu
{
	videos.jsonData = JSONObject;
	videos.jsonLength = JSONObject.length;
	paging.page = 1;
	paging.itemsWriteSelect();
	categories.selectList();
	videos.write();

}




var videos = {};

videos.timestampParse = function(timestamp)
{
	var date = new Date(timestamp*1);
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var day_w = date.getDay();

	days_array = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	months_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	return days_array[day_w]+", "+day+" "+months_array[month]+" "+year;
}

videos.getImage = function(image)
{
	if(image == "") {
		return "no-image";
	} else {
		return image;
	}
}

videos.getCategories = function(categories) {
	
	categories_string = "";
	for(i=0; i<categories.length; i++) {
		if(i+1 === categories.length) {
			categories_string += categories[i]; 
		} else {
			categories_string += categories[i]+", "; 
		}
		
	}
	return categories_string;
}


videos.write = function(page, media)
{
	JSONObject = videos.jsonData;
	paging.pagePanel();

	var keys = Object.keys(JSONObject[0]);
	
	var item_min, item_max, i;
	var item = "";
	var body = "";

	item_min = paging.item_min(page, media);
	item_max = paging.item_max(page, media);

	var li = document.createElement("li"); 
	li.className = "list-item";  

	var div = document.createElement("div");
	div.className = "list-item-shadow";

	var span = document.createElement("span");
	span.className = "list-item-shadow-title";

	var video = document.createElement("video");
	video.className = "list-item-video";
	video.setAttribute('style', 'background: url({{ image }}.jpg);background-size: cover;background-position: center center;');
	video.controls = true;

	var article = document.createElement("article");
	article.className = "list-item-text";

	var h2 = document.createElement("h2");
	h2.className = "list-item-title";

	var h3 = document.createElement("h3");
	h3.className = "list-item-date";                    

	var title = document.createTextNode("{{ title }}");
	var timestamp = document.createTextNode("{{ timestamp }}");
	var video_title = document.createTextNode("{{ categories }}");


	li.appendChild(div);
	div.appendChild(span);
	span.appendChild(video_title);  
	li.appendChild(video);
	li.appendChild(article);
	article.appendChild(h2);
	article.appendChild(h3);
	h2.appendChild(title);
	h3.appendChild(timestamp);

	var response;
	document.getElementById("item-template").innerHTML = "";
	document.getElementById("item-template").appendChild(li);

	for(i=item_min; i<item_max; i++) {
		item = document.getElementById('item-template').innerHTML;
		for(x=0; x<5; x++) {
			key = keys[x];
			switch(key) {
				case 'categories': response = videos.getCategories(JSONObject[i][key]);break;
				case 'image': response = videos.getImage(JSONObject[i][key]);break;
				case 'timestamp': response = videos.timestampParse(JSONObject[i][key]);break;
				default: response = JSONObject[i][key];break;
			}
			item = item.replace("{{ "+key+" }}", response);
		}
		body += item;
		item = "";
	}
	document.getElementsByClassName("list-body")[0].innerHTML = body;
}


var paging = {};

paging.nextPage = function()
{
	var itemsOnPage = paging.itemsToPageNum();
	var page = paging.page;
	var items_all = videos.jsonLength;
	
	if(itemsOnPage*page < items_all)
	{
		page++;
		paging.page = page;
		videos.write(page);
	}
}


paging.previousPage = function()
{
	var page =  paging.page;
	if(page > 1)
	{
		page--;
		paging.page = page;
		videos.write(page);
	}
}


paging.pagePanel = function()
{
	var itemsOnPage = paging.itemsToPageNum();
	var page =  paging.page;
	var items_all = videos.jsonLength;
	
	var page_item = "";
	var pages = Math.ceil(items_all/itemsOnPage);

	if(page === 1) {
		document.getElementById("paging-previous").style.visibility = "hidden";
	} else {
		document.getElementById("paging-previous").style.visibility = "visible";
	}

	if(page === pages) {
		document.getElementById("paging-next").style.visibility = "hidden";
	} else {
		document.getElementById("paging-next").style.visibility = "visible";
	}

	if(page > 2) {
		page_item += '<div class="paging-pagenum" data-id="1">1</div>';
		if(page > 3) { page_item += "..."; }
	}
	for(x=1; x<=pages; x++) {
		if(x-1 === page) {
			page_item += '<div class="paging-pagenum" data-id="'+x+'" >'+x+'</div>';
		}

		if(x === page) {
			page_item += '<div class="paging-pagenum paging-selected" data-id="'+x+'">'+x+'</div>';
		}

		if(x+1 === page) {
			page_item += '<div class="paging-pagenum" data-id="'+x+'">'+x+'</div>';
		}
	}

	if(page+1 < pages ) {
		if(page+2 < pages) { page_item += "..."; } 
		page_item += '<div class="paging-pagenum" data-id="'+pages+'">'+pages+'</div>';
	}

	document.getElementById("paging-buttons").innerHTML = page_item;
	paging.clickEvent();
}


paging.concretePage = function(page)
{
	paging.page = page;
	videos.write(page);
}


paging.item_min = function(page, media)
{
	var itemsOnPage = paging.itemsToPageNum();
	var items_all = videos.jsonLength;
	if(page == undefined) {
		page = 1;
	}
	
	if(media == 'mobile') {
		return 0;
	}

	else {
		return (page-1)*itemsOnPage;
	}
}


paging.item_max = function(page, media)
{
	var items_all = videos.jsonLength;
	var itemsOnPage = paging.itemsToPageNum();
	if(page == undefined) {
		return itemsOnPage;
	}
	
	if(media == 'mobile') {
		return page*itemsOnPage;
	}

	else {	
		if((items_all-(page-1)*itemsOnPage) < itemsOnPage) {
			return items_all;
		}
		else {
			return page*itemsOnPage;
		}
	}
}

paging.itemsToPageFunc = function()
{
	var num = document.getElementById("list-select").value;
	paging.itemsToPage = num*1;

	page_actual = paging.page;
	var page_all = videos.jsonLength / paging.itemsToPage;
	
	if(page_actual >= page_all)
	{
		page_actual = page_all;
	}

	paging.page = Math.ceil(page_actual);
	videos.write(page_actual);
	paging.pagePanel();
}

paging.itemsToPageNum = function()
{
	if(paging.itemsToPage == undefined) {
		return 12;
	} else {
		return paging.itemsToPage;
	}
}

paging.itemsWriteSelect = function()
{
	var item;
	var array = [8,12,16,20];
	var num;

	num = paging.itemsToPageNum();
	for(x=0; x<array.length; x++) {
		if(array[x] == num) {
			item += "<option value="+array[x]+" selected>"+array[x]+"</option>";
		} else {
			item += "<option value="+array[x]+" >"+array[x]+"</option>";
		}
	}
	document.getElementById("list-select").innerHTML = item;
}


paging.clickEvent = function() {
	$(document).ready(function(){
		$(".paging-pagenum").click(function(){
			var index = $(this).index();
			var index = $(".paging-pagenum").eq(index).attr("data-id");
			paging.concretePage(index*1);
		});
	});
}


var categories = {};

categories.selectList = function() {

	var data = videos.jsonData;
	var categories = [];
	categories[0] = "Football";
	var control = 0;

	for(x=0; x<videos.jsonLength; x++) {
		for(i=0; i<videos.jsonData[x].categories.length; i++) {
			control = 0;
			for(j=0; j<categories.length; j++) {
				if(videos.jsonData[x].categories[i] !== categories[j]) {
					console.log(videos.jsonData[x].categories[i] +" sa nerovna "+ categories[j]);
					control = 1;
				}
				else {
					control = 0;
					break;
				}

			}	
			if(control === 1) {
				categories.push(videos.jsonData[x].categories[i]);
				console.log("push");
				control = 0;
				
			}
		}
	}
	console.log(categories);
	// var item;
	// var array = [8,12,16,20];
	// var num;

	// num = paging.itemsToPageNum();
	// for(x=0; x<array.length; x++) {
	// 	if(array[x] == num) {
	// 		item += "<option value="+array[x]+" selected>"+array[x]+"</option>";
	// 	} else {
	// 		item += "<option value="+array[x]+" >"+array[x]+"</option>";
	// 	}
	// }
	// document.getElementById("list-select").innerHTML = item;
}

var loading = {};

loading.loadMore = function()
{
	var page =  paging.page;
	var items_all = videos.jsonLength;
	
	if(12*page < items_all)
	{
		page++;
		paging.page = page;
		videos.write(page, 'mobile');
	}
}



document.getElementById("list-select").addEventListener("change", paging.itemsToPageFunc);
document.getElementById("paging-previous").addEventListener("click", paging.previousPage);
document.getElementById("paging-next").addEventListener("click", paging.nextPage);
document.getElementById("load-button").addEventListener("click", loading.loadMore);



return ajax.loadJSON("http://academy.tutoky.com/api/json.php"); // nacitanie json suboru cez AJAX

}(window, document));



window.onload = MyApp;

