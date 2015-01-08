function AjaxLoader() {}

AjaxLoader.prototype.load = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = ensureReadiness; 
		function ensureReadiness() {
			if(xhr.readyState < 4) {
				return;
			}  
			if(xhr.status !== 200) {
				return;
			}  
			if(xhr.readyState === 4) {
				callback(xhr);
			}           
		}     
		xhr.open('GET', url, true);
		xhr.send('');
}