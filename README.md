Flickr Image to Web Embed
=========================

What?
=====
This is a handy Chrome extension that detects Flickr images (img tags) in web pages and automagically replaces them with Flickr Web Embeds.

(I would put an example here of a Flickr image and an iframe embed, but github doesn't allow iframes!)

Why?
====
Because Flickr Web Embeds are neat, but they're iframes, and there isn't yet a nice way to use them with an image fallback for RSS feeds, etc. This plus a few other nasty differences between img and iframe mean not many people are using them yet.

This Chrome extension is a great way to see what the web would look like if every Flickr image were a Web Embed. It also gives those kids over at Flickr a great way to test the embeds and fancy new ways they might make them better.

How?
====
The extension itself is just a js file that finds Flickr images and builds a Web Embed (iframe) for the same image, then replaces the image with the iframe. This is all client side, obviously. The source is [here](https://github.com/cjmartin/flickrimg2embed/blob/master/extension/fi2e.js).

#### Install
(These instructions only work on Mac, Windows users can not directly install Chrome extensions.)

1. Download the Chrome extension by [clicking here](https://github.com/cjmartin/flickrimg2embed/blob/master/crx/fi2e.crx?raw=true).
2. Open the extensions window in Crome. **Window &gt; Extensions** or [click here](chrome://extensions/).
3. Drag the crx file you just downloaded into the Chrome extensions window.
