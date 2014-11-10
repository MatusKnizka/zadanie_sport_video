var showItems = function()
{
	var i;
	var	item = document.getElementsByClassName('item-template')[0].innerHTML;
	var body = "";

	for(i=0; i<12; i++)
	{
		body += item;
	}

	document.getElementsByClassName("list-body")[0].innerHTML = body;
}




showItems();