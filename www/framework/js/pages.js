/******************************************************************************
 * pages.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @author Jim B <jim@ngdcorp.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3
 *****************************************************************************/
(function(GLOBAL) {
	GLOBAL.Pages = function() {

		var currentView;
		var _self = this;

		_self.pages = {};
		_self.trayViews = {};
		_self.viewHistory = [];
		_self.elements = {};

		this.initMenu = function() {
			//var menuButton = MOB.elements.titleLeftButton;
			_self.elements.app = MOB.elements.app || null;
			_self.elements.menu = MOB.elements.menu || null;

			_addPageEvents(_self.pages._menu);
		};

		this.menuToggle = function(ev) {
			if (ev && ev.preventDefault) {
				ev.preventDefault();
			}
			var close = util.hasClass(MOB.elements.app, 'slide');

			// if not tablet
			if (window.innerWidth < 481) {
				if (close) {
					// Close and make menu inactive
					MOB.events.trigger('menuclose');
					util.removeClass(MOB.elements.app, 'slide');
					_self.elements.app.removeEventListener('touchstart',_self.menuToggle);
				} else {
					// Open Menu
					MOB.events.trigger('menuopen');
					util.addClass(MOB.elements.app, 'slide');
					_self.elements.app.addEventListener('touchstart',_self.menuToggle);
				}
			}

		};
		/**
		 * this.getView()
		 * Gets the page specified
		 *
		 * @param {String} viewID
		 *
		 * @return {Mixed} Returns the page requested, or FALSE if page is not found
		 */
		this.getView = function(viewID) {
			return (_self.pages[viewID] ? _self.pages[viewID] : false);
		};
		/**
		 * this.getTrayView()
		 * Gets the page specified
		 *
		 * @param {String} viewID
		 *
		 * @return {Mixed} Returns the page requested, or FALSE if page is not found
		 */
		this.getTrayView = function(viewID) {
			return (_self.trayViews[viewID] ? _self.trayViews[viewID] : false);
		};
		/**
		 * this.getCurrentView()
		 * Note:
		 * getCurrentView does not list active popups.
		 * aliased to this.currentView()
		 */
		this.getCurrentView = this.currentView = function() {
			return currentView;
		};
		this.getCurrentViewName = function() {
			return currentView.element.root.id;
		};
		/**
		 * this.go
		 * Switches Views by hiding the current view and then showing the new one.
		 * 
		 * @param {Mixed} viewID - Either the DOM or a string ID of the View to change to
		 * @param {Object} params - A property list to pass to the new page.
		 * @param {Boolean} saveInHistory - should this view be saved in the History?
		 *
		 */
		this.go = function(viewID, params, saveInHistory) {
			var newView = this.getView(viewID);
			// var recordInHistory = ( typeof doNotRecordInHistory == 'undefined' ) ? true : !doNotRecordInHistory;
			saveInHistory = typeof saveInHistory !== 'undefined' ? saveInHistory : true;

			if (!currentView) {
				console.error("NO CURRENT VIEW");
				return false;
			}
			if (newView) {
				_self.hide(currentView);
				setTimeout(function() {
					_self.show(newView, params);
					currentView = newView;
					if (saveInHistory)
						_self.viewHistory.push({id: viewID, params: params || null});
				}, 0);
			} else {
				console.error("The page with ID " + viewID + " could not be found.");
				alert("The page with ID " + viewID + " could not be found.", null, "Error", "OK");
			}
		};
		/**
		 * this.change()
		 * Alias of this.change()
		 */
		this.change = this.go;
		/**
		 * this.show()
		 * Shows the current page. DOES NOT ADD SHOWN PAGE TO HISTORY.
		 *
		 * @param {Mixed} viewID - DOM reference or ID of page that will be shown
		 * @param {Object} params - Any parameters to pass to the new View
		 */
		this.show = function(viewID, params) {
			var opts = params || {};
			var page = typeof viewID === 'string' ? page = this.getView(viewID) : viewID;
			if (!page) {
				console.error("The page with ID " + viewID + " could not be found.");
				alert("The page with ID " + viewID + " could not be found.", null, "Error", "OK");
			}
			MOB.events.trigger('viewshow');
			currentView = page;
			_addPageEvents(page);

			_handleButtons('show', page.buttons);

			if (typeof page.titleBar === 'undefined') {
				MOB.titleBar.show();
			} else if (typeof page.titleBar === 'boolean') {
				if (page.titleBar) {
					MOB.titleBar.show();
				} else {
					MOB.titleBar.hide();
				}
			} else if (typeof page.titleBar === 'object') {
				if (page.titleBar.class) {
					if (page.titleBar.display === false) {
						MOB.titleBar.hide();
					} else {
						MOB.titleBar.show();
					}
					if (page.titleBar.class) {
						util.addClass(MOB.elements.titleBar, page.titleBar.class);
					}
				}
			}
			MOB.titleBar.title(page.title);

			if (page.onEnter) {
				page.onEnter(opts);
			}
			util.addClass(page.element.root, 'active');
		};
		/**
		 * this.hide()
		 * Hides the current page
		 *
		 * @param {Mixed} viewID - DOM reference or ID of page that will be hidden
		 */
		this.hide = function(viewID) {
			var page = typeof viewID === 'string' ? this.getView(viewID) : viewID;
			_removePageEvents(page);

			if (page.onExit)
				page.onExit();
			util.removeClass(page.element.root, 'active');

			MOB.events.trigger('viewhide');

			if (typeof page.titleBar !== 'undefined') {
				if (typeof page.titleBar === 'object') {
					if (page.titleBar.class) {
						if (page.titleBar.class) {
							util.removeClass(MOB.elements.titleBar, page.titleBar.class);
						}
					}
				}
			}
			MOB.titleBar.title(page.title);
		};
		/** 
		 * this.tray()
		 * Shows or hides a view in the slide-up tray
		 *
		 * @param {type} action
		 * @param {type} viewID
		 * @param {type} params
		 */
		this.tray = function(action, viewID, params) {
			var opts = params || {};
			var view = typeof viewID === 'string' ? this.getTrayView(viewID) : viewID;
			if (!view) {
				console.error("The view with ID " + viewID + " could not be found.");
				alert("The view with ID " + viewID + " could not be found.", null, "Error", "OK");
			}

			if (action === 'show') {
				_addPageEvents(view);
				MOB.events.trigger('trayshow');

				if (view.onEnter)
					view.onEnter(opts);
				util.addClass(view.element.root, 'active');
				util.addClass(MOB.elements.tray, 'active');
			} else if (action === 'hide') {
				_removePageEvents(view);
				MOB.events.trigger('trayhide');
				setTimeout(function() {
					util.removeClass(view.element.root, 'active');
				}, 500);
				util.removeClass(MOB.elements.tray, 'active');
			}
		};
		/**
		 * this.goBack()
		 * Goes back in the history by one page
		 */
		this.goBack = function() {
			var currentPage, previousPage;
			if (_self.viewHistory.length < 1) {
				console.warn('Nowhere to go back to.');
				return false;
			}
			currentPage = _self.getCurrentViewName();

			previousPage = _self.viewHistory.pop();

			if (previousPage.id === currentPage) {
				previousPage = _self.viewHistory.pop();
			}
			_self.change(previousPage.id, previousPage.params);
		};
		/**
		 * this.goBackTo()
		 * Goes back in the history to the specified page
		 * @param {String} viewID - the View to return to
		 */
		this.goBackTo = function(viewID) {
			var historyCopy, currentPage, previousPage, notFinished;
			currentPage = _self.getCurrentViewName();
			previousPage = _self.viewHistory.pop();
			historyCopy = [];

			notFinished = true;
			while (previousPage.id !== viewID && notFinished) {
				previousPage = _self.viewHistory.pop();
				if (!previousPage) {

					_self.viewHistory = historyCopy;
					console.error("Reached beginning of history and view ID '" + viewID + "' not found!");
					return false;
				} else {
					historyCopy.unshift(previousPage);
				}
			}

			_self.change(previousPage.id, previousPage.params);
		};
		/**
		 * this.template()
		 * Takes input template and returns actual HTML with template tags filled in
		 *
		 * @param {mixed} element - either direct HTML or the DOM element of the template
		 * @param {Object} tags - dictionary of tags and the text to replace
		 *
		 * @return String - HTML with template tags replaced with actual text
		 */
		this.template = function(element, tags) {
			var html = element.innerHTML || element;
			for (var i in tags) {
				while (html.indexOf('%' + i.toUpperCase() + '%') > -1) {
					html = html.replace('%' + i.toUpperCase() + '%', tags[i]);
				}
			}
			return html;
		};
		/**
		 * this.parsePageElements()
		 * Adds the 'element' and 'element.root' attributes to the page (ViewController) object.
		 * 
		 * @param {Object} pageObj - the page (ViewController)
		 * @param {String} viewID - the page's ID, used with querySelector
		 */
		this.parsePageElements = function(pageObj, viewID) {
			if (!pageObj.element) {
				pageObj.element = {};
				if ( pageObj.elements ) {
					for (var i in pageObj.elements) {

						var element = document.querySelectorAll('section#' + viewID + ' ' + pageObj.elements[i]);
						if (element.length === 1) {
							element = element[0];
						}
						else if (element.length === 0) {
							element = null;
						}
						pageObj.element[i] = element;
					}

					if (!pageObj.elements.root) {
						pageObj.element.root = document.querySelector('section#' + viewID);
					}					
				} else {
					pageObj.element = {
						root : document.querySelector('section#'+viewID)
					}
				}
			}
		};
		/**
		 * Rework of loadHTML.
		 * Load the HTML and CSS files.
		 * Append the HTML to DOM container provided.
		 * See also: parsePageElements.
		 * 
		 * @param {string} viewID
		 * @param {object} viewController
		 * @param {DOMElement} containerElement
		 * @param {string} htmlPath
		 * @param {string} cssPath
		 */
		this.loadViewElements = function(viewID, viewController, containerElement, htmlPath, cssPath, callback) {

			var ts = '?ts=' + new Date().getTime();

			if (cssPath) {
				util.loadScript(cssPath + ts, 'css');
			}

			if (htmlPath) {
				var xhr = new XMLHttpRequest;
				xhr.open('GET', htmlPath + ts, true);
				xhr.send();
				xhr.onreadystatechange = function() {
					var state = xhr.readyState,
							status = xhr.status,
							htmlStr = xhr.responseText;
					if (state === 4 && (status === 200 || status === 0)) {

						// put response in tmpDoc, then get HTML from doc
						var tmpDoc = document.implementation.createHTMLDocument("tmpDocTitle");
						tmpDoc.documentElement.innerHTML = htmlStr;
						var htmlElement = tmpDoc.body.firstChild;

						containerElement.appendChild(htmlElement);

						// is there a sleep necesary between the append and the parse
						_self.parsePageElements(viewController, viewID);

						callback && callback();

					} else if (state === 4 && status !== 200) {
						console.error("could not load " + htmlPath + " (" + status + ")");
					}
				};
			}
		};
		/**
		 * _addPageEvents
		 * Private function used during this.show() to add the page events
		 * when showing the page
		 *
		 * @param {type} page
		 */
		_addPageEvents = function(page) {
			_handlePageEvents('add', page);
		};
		/**
		 * _removePageEvents
		 * Private function used during this.hide() to remove the page events
		 * when hiding the page
		 *
		 * @param {type} page
		 */
		_removePageEvents = function(page) {
			_handlePageEvents('remove', page);
		};
		/**
		 * _handlePageEvents and _addBinding
		 * Private functions used during _addPageEvents() and _removePageEvents()
		 * to perform the given tasks, with closure
		 *
		 * If an custom event object does not have a DOMElement specified, 
		 * then document is assumed.
		 *
		 * Multiple elements may be defined, separated by a comma.
		 * 
		 * @param {type} action
		 * @param {type} page
		 */
		_handlePageEvents = function(action, page) {
			if (page.events) {
				for (var i = 0, len = page.events.length; i < len; i++) {
					var toBind = page.events[i], target;
					if (!toBind.element) {
						_addBinding(document, toBind, action, page);
					} else {
						target = toBind.element.split(',');
						for (j in target) {
							var targetElement = target[j].trim();
							_addBinding(page.element[targetElement], toBind, action, page);
						}
					}
				}
			}
		};
		/**
		 * 
		 * @param {string} action - no longer used (titleBarButtons)
		 * @param {type} buttons
		 */
		_handleButtons = function(action, buttons) {
			MOB.titleBar.updateButtons(buttons);
		};
		/**
		 * Note on _addBinding()
		 * If the custom event object does not specify a handler,
		 * Then the app binds the event to a method with the same name as the
		 * event. This is useful for triggering handlers like 'loginsuccess' or
		 * 'refresh'
		 * 
		 * @param {type} target
		 * @param {type} toBind
		 * @param {type} action
		 * @param {type} page
		 * @returns {Boolean}
		 */
		_addBinding = function(target, toBind, action, page) {
			var handler = (toBind.handler) ? page[toBind.handler] : (page[toBind.event]) ? page[toBind.event] : toBind.event;
			var targetElement = target;


			__doBinding = function(targetElement, toBind, action, handler) {

				if (targetElement) {
					if (action === 'add') {
						targetElement.addEventListener(toBind.event, handler);
					} else {
						targetElement.removeEventListener(toBind.event, handler);
					}
				}
			};
			if (targetElement == null) {
				return false;
			}
			if (targetElement.length && targetElement.tagName !== 'FORM') {
				for (var i = 0, len = targetElement.length; i < len; i++) {
					__doBinding(targetElement[i], toBind, action, handler);
				}
			} else {
				__doBinding(targetElement, toBind, action, handler);
			}
		};
	};
})(window);