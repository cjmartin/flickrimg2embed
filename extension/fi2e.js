// Flickr img to embed.
//
// This grabs all of the Flickr images in the page, builds an iframe embed,
// and replaces the original image with a Flickr Web Embed.
//

function runCode(){
	!function(a,b,c,d,e){a[c]=a[c]||{process:function(b){(a[c].q=a[c].q||[]).push(b)}};var f=b.createElement(d),g=b.getElementsByTagName(d)[0];f.async=1,f.src=e,g.parentNode.insertBefore(f,g)}(window,document,"FlickrEmbedr","script","https://www.flickr.com/services/js/embedr.js"),window.FlickrEmbedr.process("all");
}

(function() {
	var s = document.createElement('script');
	s.text = '(' + runCode.toString() + ')();';
	document.body.appendChild(s);
})();