/******************************************************************************
 * util.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @author Jim B <jim@ngdcorp.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3 
 *****************************************************************************/
window.util = {
	/**
	 * util.loadScript
	 * Loads CSS or JS file by appending tag to the head element.
	 * 
	 * @param {String} filename - The relative path of the file to load
	 * @param {type} type - 'js' or 'css'
	 * @param {type} callback - optional
	 * @returns {Boolean} true if successfully loaded
	 */
	loadScript: function(filename, type, callback) {
		switch (type.toLowerCase()) {
			case 'js':
				var link = document.createElement('script');
				link.setAttribute('src', filename + '.js?ts=' + new Date().getTime());
				link.setAttribute('type', 'text/javascript');
				break;
			case 'css':
				var link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('href', filename + '.css?ts=' + new Date().getTime());
				break;
			default:
				return false;
		}
		// console.log("util.loadScript: " + filename + "." + type);
		document.querySelector('head').appendChild(link);
		
		if (callback && callback.call)
			callback.call();
		return true;
	},
	/**
	 * util.isValidEmail
	 * Checks to see if the string passed is a properly formatted email address
	 * But does not connect to a server to check if the email address is valid 
	 * 
	 * @param {String} email
	 * 
	 * @return {Bool} If the parameter passed is indeed an email address 
	 **/
	isValidEmail: function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	isNumber: function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	},
	/**
	 * util.addClass
	 * Adds the specified class to the specified element or set of elements.
	 * 
	 * @param HTMLElement element
	 * @param String classText
	 */
	addClass: function(element, classText) {
		if (util.isNumber(element.length)) {
			for (var i = 0, len = element.length; i < len; i++) {
				// element[i].classList.add ( classText );
				if (!element[i].className.match(classText))
					element[i].className += " " + classText;
			}
		} else {
			// element.classList.add ( classText );
			if (!element.className.match(classText))
				element.className += " " + classText;
		}
	},
	/**
	 * util.removeclass
	 * Removes the specified class to the specified element or set of elements.
	 * @param HTMLElement element
	 * @param String classText
	 */
	removeClass: function(element, classText) {
		var reg = new RegExp("\\b" + classText + "\\b", "gi")
		if (util.isNumber(element.length)) {
			for (var i = 0, len = element.length; i < len; i++) {
				// element[i].classList.remove ( classText );
				element[i].className = element[i].className.replace(reg, '');
			}
		} else {
			// element.classList.remove ( classText );
			element.className = element.className.replace(reg, '');
		}
	},
	/**
	 * util.hasClass
	 * Checks to see if the specified element has the specified class
	 */
	hasClass: function(element, classText) {
		var reg = new RegExp("\\b" + classText + "\\b", "gi");
		if (element.length) {
			console.warn("util.hasClass attempted on multiple elements")
			return false;
		} else {
			return reg.test(element.className);
		}
	},
	/**
	 * util.travelUpTo
	 * Travels up the DOM from the current item until the target element is hit
	 * 
	 * @param {HTMLElement} el - The element from which to start
	 * @param {String} target - the target element - supports TAG NAME only
	 * 
	 * @return {HTMLElement} The target element OR null if not found
	 */
	travelUpTo: function(el, target) {
		var element = el, i = 0;
		while (element && element.tagName.toUpperCase() != target.toUpperCase()) {
			if (element.tagName == 'HTML')
				break;
			else
				element = element.parentNode;
			i++;
		}
		if (element.parentNode == document)
			return null;
		else
			return element;
	},
	/**
	 * util.sortArrayOfObjects
	 * @param {Array} theArray
	 * @param {String} key
	 * @param {String} order
	 * 
	 * @return {Array} - If theArray is not a valid array or the key is not in the array, return it without incident. Or return the sorted awway 
	 */
	sortArrayOfObjects: function(theArray, key, order) {
		if (typeof theArray != 'object' && theArray.length < 2) {
			console.warn("not an array");
			return theArray;
		}
		;

		if (typeof theArray[0][key] == 'undefined' && key.indexOf('.') < 0) {
			console.warn(key + " not found in objects.");
			return theArray;
		} else if (key.indexOf('.') >= 0) {
			var keyArray = key.split('.');
			if (keyArray.length > 2) {
				console.warn(key + " not supported.");
				return theArray;
			} else {
				var key = keyArray, keyIsObject = true;
			}
		}

		order = order ? order.toUpperCase() : '';
		// Assume ASCENDING if order is not filled in properly.
		if (order != 'ASC' && order != 'DESC')
			order = 'ASC';

		theArray.sort(function(obj1, obj2) {
			// First check for anything null/undefined and try to push all to the end
			if (keyIsObject) {
				var key1 = obj1[key[0]][key[1]], key2 = obj2[key[0]][key[1]];
			} else {
				var key1 = obj1[key], key2 = obj2[key];
			}
			if ((typeof key1 == 'undefined' || key1 == null)) {
				if (typeof key2 == 'undefined' || key2 == null) {
					return 0;
				} else {
					return 1;
				}
			} else if (typeof key2 == 'undefined' || key2 == null) {
				return -1;
			}

			// Now sort by ascending or descending
			if (order == 'ASC') {
				// Process SORT ASCENDING based on property type
				if (typeof key1 == 'string') {
					if (key1.toLowerCase() > key2.toLowerCase())
						return 1;
					else if (key2.toLowerCase() > key1.toLowerCase())
						return -1;
					else if (key1.toLowerCase() == key2.toLowerCase())
						return 0;
				}

				// Default Sorting
				if (key1 > key2)
					return 1;
				else if (key2 > key1)
					return -1;
				else if (key1 == key2)
					return 0;
				return (key1 - key2);
			} else {
				// Process SORT DESCENDING based on property type
				if (typeof key1 == 'string') {
					if (key1.toLowerCase() < key2.toLowerCase())
						return 1;
					else if (key2.toLowerCase() < key1.toLowerCase())
						return -1;
					else if (key1.toLowerCase() == key2.toLowerCase())
						return 0;
				}

				// Default Sorting
				if (key1 < key2)
					return 1;
				else if (key2 < key1)
					return -1;
				else if (key1 == key2)
					return 0;
				return (key2 - key1);
			}
		})

		return theArray;
	},
	/**
	 * JSON.stringify, but rigged to avoid "TypeError: cyclic object value"
	 * @param {type} obj
	 * @returns String representation of obj
	 */
	safeStringify: function(obj) {
		var cache = [];
		var s = JSON.stringify(obj, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
// Circular reference found, discard key
					return;
				}
// Store value in our collection
				cache.push(value);
			}
			return value;
		});
		cache = null; // Enable garbage collection
		return s;
	}
}