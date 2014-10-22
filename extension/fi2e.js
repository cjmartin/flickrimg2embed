
(function(win, doc, fe, script, url){
	// If win[fe] exists, we'va already done this work, so do nothing.
	if (!win[fe]) {
		//if the embed code doesn't exist on the page already
		//we create a queue
		win[fe] = {
			process: function(type){
				//push any process calls into the queue
				(win[fe].q=win[fe].q||[]).push(type);
			}
		};
		//create a script element for the
		//loader script
		var s = doc.createElement(script),
			target =doc.getElementsByTagName(script)[0];

		s.async=1;
		s.src=url;
		//add the script to the DOM so that it loads
		target.parentNode.insertBefore(s,target);
	}
})(window, document, 'FlickrEmbedr', 'script', 'https://widgets.flickr.com/embedr/embedr-loader.js');

window['FlickrEmbedr'].process('all');
console.log(window['FlickrEmbedr'].q);