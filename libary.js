var videos = {};

videos.loadJSON = function(page, media)
{
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var JSONObject = JSON.parse(xmlhttp.responseText);
			videos.write(JSONObject, page, media);
		}
	}
	xmlhttp.open("GET","http://academy.tutoky.com/api/json.php",true);
	xmlhttp.send();
}





videos.timestampParse = function(timestamp)
{
	var date = new Date(timestamp*1);
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();
	var day_w = date.getDay();

	switch(day_w)
	{
		case 0: day_w = "Monday";break;
		case 1: day_w = "Tuesday";break;
		case 2: day_w = "Wednesday";break;
		case 3: day_w = "Thursday";break;
		case 4: day_w = "Friday";break;
		case 5: day_w = "Saturday";break;
		case 6: day_w = "Sunday";break;
	}
	return day_w+", "+day+"."+month+"."+year;
}

videos.getImage = function(image)
{
	if(image == "") {
		return "6";
	} else {
		return image;
	}
}

videos.write = function(JSONObject, page, media)
{
	document.getElementById("items_all").innerHTML = JSONObject.length;
	paging.pagePanel();
	var item_min;
	var item_max;
	var item = "";
	var i;
	var body = "";
	if(page == undefined) {
		page = 1;
	}
	
	if(media == 'mobile')
	{
		item_min = 0;
		item_max = page*12;
	}

	else
	{
		var item_min = (page-1)*12;
		var item_max = page*12;
	}

	for(i=item_min; i<item_max; i++)
	{
		item += '<li class="list-item">';
		item += '<div class="list-item-shadow">';
		item += '<span class="list-item-shadow-title">FOOTBALL</span>';
		item += '</div>';
		item += '<video class="list-item-video" style="background-image: url('+videos.getImage(JSONObject[i].image)+'.jpg);"  controls>';
		item += '</video>';
		item += '<article class="list-item-text">';
		item += '<h2 class="list-item-title">'+JSONObject[i].title+'</h2>';
		item += '<h3 class="list-item-date">'+videos.timestampParse(JSONObject[i].timestamp)+'</h3>';
		item += '</article>';
		item += '</li>';
		body += item;
		item = "";
	}
	document.getElementsByClassName("list-body")[0].innerHTML = body;
}



var paging = {};

paging.nextPage = function()
{

	var page = document.getElementById("page").innerHTML;
	var items_all = document.getElementById("items_all").innerHTML;
	page++;
	if(12*page < items_all)
	{
		document.getElementById("page").innerHTML = page;
		videos.loadJSON(page);
	}
}



paging.previousPage = function()
{
	var page = document.getElementById("page").innerHTML;
	if(page > 1)
	{
		page--;
		document.getElementById("page").innerHTML = page;
		videos.loadJSON(page);
	}
}



paging.pagePanel = function()
{
	var page = document.getElementById("page").innerHTML;
	var items_all = document.getElementById("items_all").innerHTML;
	
	var page_item = "";
	var pages = items_all/12;

	for(x=1; x<=pages; x++)
	{
		if(x == page) {
			page_item += '<div class="paging-pagenum paging-selected">'+x+'</div>';
		}	
		else {		
			page_item += '<div class="paging-pagenum" onclick="paging.concretePage('+x+')">'+x+'</div>';
		}
	}
	document.getElementById("paging-buttons").innerHTML = page_item;
}


paging.concretePage = function(page)
{
	document.getElementById("page").innerHTML = page;
	videos.loadJSON(page);
}



var loading = {};

loading.loadMore = function()
{
	var page = document.getElementById("page").innerHTML;
	var items_all = document.getElementById("items_all").innerHTML;
	page++;
	if(12*page < items_all)
	{
		document.getElementById("page").innerHTML = page;
		videos.loadJSON(page, 'mobile');
	}
}


videos.loadJSON();


