/**************************************************************************
 * file.js
 * @author  Jason Vertucio <me@jasonvertucio.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3
**************************************************************************/
(function(GLOBAL){
	GLOBAL.File = {
		/**
		 * File.loadScript
		 * Loads either a CSS or JS file
		 * 
		 * @param {String} filename - The relative path of the file to load
		 *  
		 */
		loadScript : function ( filename , type ) {
			var fileSplit = filename.split('.') ,
				type = fileSplit[fileSplit.length-1];
			switch ( type.toLowerCase() ) {
				case 'js':
					var link = document.createElement('script');
					link.setAttribute('src',filename);
					break;
				case 'css':
					var link = document.createElement('link');
					link.setAttribute('rel','stylesheet');
					link.setAttribute('href',filename);
					break;
				default:
					return false;
			}
			document.querySelector('head').appendChild(link);
			return true;
		},
		/**
		 * File.loadHTML
		 * Loads an HTML fle and places it into the DOM
		 *
		 * @param {String} filename
		 * @param {HTMLElement} el (optional) If not specified, file is placed at the end of the body
		 *
		 * @return {Boolean} true if file placed successfully, false if not. Obviously
		**/
		loadHTML : function ( filename , el ) {
			if ( typeof el == 'undefined' ) el = document.body;
			var xhr = new XMLHttpRequest;
			xhr.open ('GET',filename,true);
			xhr.send ();
			xhr.onreadystatechange = function() {
				var state = xhr.readyState, status = xhr.status , response = xhr.responseText;
				if ( state == 4 && status == 200) {
					var doc = document.implementation.createHTMLDocument("example");
					doc.documentElement.innerHTML = response;
					var html = doc.body.firstChild;
					el.appendChild ( html );
					return true;
				} else if ( state ==4 && status != 200 ) {
					return false;
				}
			}
		}
	}
})(window)