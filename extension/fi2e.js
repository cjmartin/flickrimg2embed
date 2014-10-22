
(function(win, doc, fe, script, url){
	//create a script element for the
	//loader script
	var s = doc.createElement(script),
		target =doc.getElementsByTagName(script)[0];

	s.async=1;
	s.src=url;
	//add the script to the DOM so that it loads
	target.parentNode.insertBefore(s,target);
})(window, document, 'FlickrEmbedr', 'script', 'https://widgets.flickr.com/embedr/embedr-loader.js');

window.onload = function() {
	window.FlickrEmbedr = new FlickrEmbedr();
	window['FlickrEmbedr'].process('all');
};