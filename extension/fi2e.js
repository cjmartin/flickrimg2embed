// Flickr img to embed.
//
// This grabs all of the Flickr images in the page, builds an iframe embed,
// and replaces the original image with a Flickr Web Embed.
//

(function() {
	// Grab all Flickr hosted images on the page. (data-canonical-src entries are for sites that cache nicely)
	var images = Array.prototype.slice.call(document.querySelectorAll("
		img[src^='https://farm'][src*='flickr.com'][src$='.jpg'],
		img[src^='http://farm'][src*='flickr.com'][src$='.jpg'],
		img[src^='https://c'][src*='flickr.com'][src$='.jpg'],
		img[src^='http://c'][src*='flickr.com'][src$='.jpg'],
		img[data-canonical-src^='https://farm'][data-canonical-src*='flickr.com'][data-canonical-src$='.jpg'],
		img[data-canonical-src^='http://farm'][data-canonical-src*='flickr.com'][data-canonical-src$='.jpg'],
		img[data-canonical-src^='https://c'][data-canonical-src*='flickr.com'][data-canonical-src$='.jpg'],
		img[data-canonical-src^='http://c'][data-canonical-src*='flickr.com'][data-canonical-src$='.jpg']"
		));

	var photoRe = /(flickr.com|flic.kr)\/(photos|p)\/([0-9a-zA-Z-_]+|[0-9]+@N[0-9]+)\/([0-9]+)\/?(in)?\/?([^\/]+)?/;
	var photoIdRe = /(\d+)_([a-zA-Z0-9]+)_?[a-z]?.jpg$/;

	function replaceImg(embedSrc, image, replaceNode) {
		var imgWidth = null;
		var divisor = null;
		var setHeight = null;

		embed = document.createElement("iframe");
		embed.setAttribute("src", embedSrc);
		embed.setAttribute("frameborder", "0");
		embed.setAttribute("allowfullscreen", '');
		embed.setAttribute("webkitallowfullscreen", '');
		embed.setAttribute("mozallowfullscreen", '');
		embed.setAttribute("oallowfullscreen", '');
		embed.setAttribute("msallowfullscreen", '');
		embed.style.cssText = image.style.cssText;

		// Lets figure out the correct width/height, padding, etc.
		imgWidth = image.offsetWidth-parseInt(window.getComputedStyle(image, null).getPropertyValue('padding-left'), 10)-parseInt(window.getComputedStyle(image, null).getPropertyValue('padding-right'), 10);
		embed.style.paddingTop = window.getComputedStyle(image, null).getPropertyValue('padding-top');
		embed.style.paddingRight = window.getComputedStyle(image, null).getPropertyValue('padding-right');
		embed.style.paddingBottom = window.getComputedStyle(image, null).getPropertyValue('padding-bottom');
		embed.style.paddingLeft = window.getComputedStyle(image, null).getPropertyValue('padding-left');

		// Here we're going to use the "natural" width and height of the image
		// to set the initial width/height of the iframe based on the offsetWidth
		// of the image (width it's actually displayed in the page).
		//
		// Why? Because we don't actually trust the offsetHeight. Images can be
		// stuck into width/height that doesn't match the narural aspect ratio
		// and the browser compensates to make them look *ok*. iFrames don't behave
		// this way, so we really want the height to be set correctly.

		divisor = image.naturalWidth/imgWidth;
		setHeight = image.naturalHeight/divisor;
		
		// setHeight = Math.ceil(image.naturalHeight/divisor);

		embed.style.width = imgWidth+"px"; 
		embed.style.height = setHeight+"px";

		// if (replaceNode.nodeName.toLowerCase() != 'a') {
		// 	embed.style.border = "5px solid #FF0000";
		// }

		replaceNode.parentNode.replaceChild(embed, replaceNode);
	}

	function analyzeImg(image) {
		var photoInfo = null;
		var metaTags = null;
		var PhotoPageUrl = null;
		var embedSrc = null;
		var replaceNode = null;

		// Figure out what we're going to embed.
		if (image.parentNode.nodeName.toLowerCase() === 'a' && image.parentNode.href !== "") {
			photoInfo = image.parentNode.href.match(photoRe);
			if (photoInfo) {
				replaceNode = image.parentNode;

				embedSrc = "https://www.flickr.com/photos/"+photoInfo[3]+"/"+photoInfo[4];

				if (photoInfo[5] && photoInfo[6] != "photostream") {
					embedSrc += "/in/"+photoInfo[6]+"/player";
				} else {
					embedSrc += "/frame";
					// embedSrc += "/player";
				}

				if (embedSrc) {
					replaceImg(embedSrc, image, replaceNode);
					return;
				}
			}
		}

		photoInfo = image.src.match(photoIdRe);

		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			metaTags = this.responseXML.getElementsByTagName('meta');

			for (var i = 0; i < metaTags.length; i++) {
				if (metaTags[i].getAttribute("name") == "og:url") {
					photoPageUrl = metaTags[i].getAttribute("content");
					break;
				}
			}

			if (photoPageUrl) {
				embedSrc = photoPageUrl+"/frame";
				replaceImg(embedSrc, image, image);
			}
		}
		xhr.open('GET', 'https://www.flickr.com/photo.gne?id='+photoInfo[1], true);
		xhr.responseType = "document";
		xhr.send(null);
	}

	// Replace the images with embeds.
	if (images) {
		images.forEach(function(image, index, array) {
			if (image.naturalWidth > 0 && image.naturalHeight > 0) {
				analyzeImg(image);
			} else {
				image.addEventListener('load', function(){
					analyzeImg(this);
				}, false);
			}
		});
	}

})();