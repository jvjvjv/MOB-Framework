/*****************************************************************************
 * mob.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @author Jim B <jim@ngdcorp.com>
 * @copyright 2014, Jason Vertucio.
 * @license GPLv3
 ****************************************************************************
**/
window.MOB = {
	options: {},
	pageController: null,
	events: null,
	// If we want to store global variables, we can do that here:
	GLOBAL: {},
	/**
	 * MOB.init()
	 * Initialises all parts of the Mobile Framework.
	 *
	 */
	init: function(options) {
		this.views = new Pages;
		this.events = new Events;
		this.titleBar = new TitleBar;

		this.initOptions = options || {};

		this.loadJSON();
	},
	/**
	 * MOB.loadJSON()
	 * Loads the config.json file, which should contain all settings and
	 * pages to load, as well as CSS and Javascripts.
	 */
	loadJSON: function() {
		var xhr = new XMLHttpRequest, _self = this;
		xhr.open('GET', './config.json', true);
		xhr.send();
		xhr.onreadystatechange = function() {
			var state = xhr.readyState, status = xhr.status, response = xhr.responseText;
			if (state == 4 && (status == 200 || status === 0)) {
				_self.loadDefaults(JSON.parse(response));
			} else if ((state == 4 && status != 200)) {
				console.error("could not load load.json (Error " + status + ")");
				return false;
			}
		}
	},
	/**
	 * Loads all the default options from load.json, and stores all of the HTML files
	 * @param {Object} jsonObj - config.json
	 */
	loadDefaults: function(jsonObj) {
		var _self = this;
		this.options = jsonObj;
		this.app = jsonObj.app;
		this.home = jsonObj.homeView;
		this.defaultView = jsonObj.defaultView;
		this.viewLoadCount = 0;
		this.viewLoadTotal = jsonObj.views.length;
		jsonObj.trayViews && (this.viewLoadTotal += jsonObj.trayViews.length);
		_self.app.options.menu && this.viewLoadTotal++

		this.elements = this.elements || {};
		for (var i in this.app.elements) {
			// get references to top-level elements (app-views, sidebars, titlebar, etc)
			this.elements[i] = document.querySelector(this.app.elements[i]);
		}

		if (_self.app.options.menu === true) {
			util.loadScript(_self.app.options.folders.js + jsonObj.menu, 'js');
		}

		for (var i in jsonObj.js) {
			// Load all non-view js scripts, libraries, etc
			util.loadScript(_self.app.options.folders.js + jsonObj.js[i], 'js');
		}

		for (var i in jsonObj.css) {
			// load non-view specific CSS
			util.loadScript(_self.app.options.folders.css + jsonObj.css[i], 'css');
		}

		for (var i in jsonObj.views) {
			// load view js & css
			util.loadScript(_self.app.options.folders.js + jsonObj.views[i], 'js');
		}

		if (jsonObj.trayViews) {
			console.log("Loading Tray Views");
			for (var i in jsonObj.trayViews) {
				// load trayView js & css
				util.loadScript(_self.app.options.folders.js + jsonObj.trayViews[i], 'js');
			}
		}
	},
	/**
	 * MOB.loadFirstView()
	 */
	loadFirstView: function() {
		var initialPage = this.home, _self = this;

		if (MOB.views.getView(initialPage)) {
			MOB.events.trigger('init');
			MOB.views.show(initialPage);
			MOB.views.viewHistory.push({id: initialPage, params: null});
			if ( this.initOptions && this.initOptions.callback ) {
				if (this.initOptions.callback.call) this.initOptions.callback.call();
			}
		} else {
			setTimeout(_self.loadFirstView, 500);
		}
	},
	registerMenu: function(viewID, viewController) {
		MOB.views.pages[viewID] = viewController;
		this.processNewView(viewID, viewController, this.elements.menu);
	},
	registerView: function(viewID, viewController) {

		MOB.views.pages[viewID] = viewController;
		this.processNewView(viewID, viewController, this.elements.views);
	},
	registerTrayView: function(viewID, viewController) {

		MOB.views.trayViews[viewID] = viewController;
		this.processNewView(viewID, viewController, this.elements.tray);
	},
	processNewView: function(viewID, viewController, containerElement) {

		var thiz = this;
		var htmlPath = this.app.options.folders.html + viewID + ".html";
		var cssPath = this.app.options.folders.css + viewID + ".css";
		
		MOB.views.loadViewElements(viewID, viewController, containerElement, htmlPath, cssPath, function() {
			// console.log("MOB.processNewView: complete: viewID=" + viewID);
			thiz.onViewLoadComplete();
		});
	},
	onViewLoadComplete: function() {

		this.viewLoadCount++;
		if (this.viewLoadCount === this.viewLoadTotal) {
			this.titleBar.init();
			if ( MOB.options.menu ) MOB.views.initMenu();
			this.loadFirstView();
		}
	}
};
console.log('MOB loaded');