//create a script element for the
//embedder script
var s = document.createElement('script'),
	target =document.getElementsByTagName('script')[0];

s.async=1;
s.src='https://widgets.flickr.com/embedr/embedr-global.js';
//add the script to the DOM so that it loads
target.parentNode.insertBefore(s,target);