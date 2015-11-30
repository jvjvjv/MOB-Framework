/******************************************************************************
 * titlebar.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @author Jim B <jim@ngdcorp.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3
 *****************************************************************************/
(function(GLOBAL) {
	GLOBAL.TitleBar = function() {
		var _buttonEvents = {};
		var _self = this;
		var _touchEvent = 'tap'; // tap, click

		var hideButton = {
			action: "none"
		};
		_self.elements = {};
		_self.buttonAttribs = {};

		/**
		 * this.init()
		 *
		 **/
		this.init = function() {

			_self.elements.titleBar = MOB.elements.titleBar;
			_self.elements.title = MOB.elements.title;

			// define titleBar buttons as buttonAttribs obj
			// This should probably get moved to config.json somehow,
			// but the framework owner can figure that one out :)
			_self.buttonAttribs = {
				// names must correspond to buttons settings in View's js files
				left: {
					element: MOB.elements.titleLeftButton,
					currentProps: null

				},
				right: {
					element: MOB.elements.titleRightButton,
					currentProps: null
				}
			};

			_self.elements.leftButton = MOB.elements.titleLeftButton;
			_self.elements.rightButton = MOB.elements.titleRightButton;
		};
		/**
		 * this.title()
		 * Changes the title in the title bar
		 *
		 * @param String theTitle - if omitted, use default title
		 */
		this.title = function(theTitle) {
			var titleBarTitle = (!theTitle ? MOB.app.options.defaultTitle : theTitle);
			_self.elements.title.innerHTML = titleBarTitle;
		}
		/**
		 * this.show()
		 * Shows the Title Bar
		 */
		this.show = function() {
			util.removeClass(_self.elements.titleBar, 'hidden');
			// util.removeClass ( MOB.elements.views , 'no-scroll' );
			util.removeClass(MOB.views.getCurrentView().element.root, 'no-titlebar');
			_adjustViewportHeight();
		}
		/**
		 * this.hide()
		 * Shows the Title Bar
		 */
		this.hide = function() {
			util.addClass(_self.elements.titleBar, 'hidden');
			// util.addClass ( MOB.elements.views , 'no-scroll' );
			util.addClass(MOB.views.getCurrentView().element.root, 'no-titlebar');
			_adjustViewportHeight();
		}
		/**
		 * this.class()
		 * Adds or removes a class to the titlebar.
		 *
		 * @param {String} action - allowed values are 'add' and 'remove'
		 * @param {Object} className - The class to add or remove.
		 *
		 * N.B. 'a' and 'r' will work for action, and only one class may be added
		 **/
		this.class = function(action, className) {
			action = action.toLowerCase();

			if (action != 'add' && action != 'remove' && action != 'a' && action != 'r') {
				console.warn("titleBar.class - incorrect Action");
				return false;
			}
			if (typeof className != 'string' || / /.test(className)) {
				console.warn("titleBar.class - className is invalid");
				return false;
			}

			if (action.substring(0, 1) == 'a') {
				util.addClass(_self.elements.titleBar, className)
			} else {
				util.removeClass(_self.elements.titleBar, className)
			}
		}

		/**
		 * this.updateButtons()
		 * Places a button on the specified side of the title bar.
		 * The button arguments will be checked for button as defined in this
		 * objects buttonAttribs object.
		 * @param {object} buttons - button definitions as configured in the View's js file
		 */
		this.updateButtons = function(buttons) {
			// titleBarButtons - 6; loop buttonAttribs for valid button IDs (left/right)
			buttons = buttons ? buttons : {};
			for (var buttonId in _self.buttonAttribs) {
				this.button(buttonId, buttons[buttonId]);
			}
		};

		/**
		 * this.button()
		 * Places a button on the specified side of the title bar
		 *
		 * @param {String} buttonId - Specified the left or right side.
		 * @param {Object} buttonProperties - Specifies text, image, class, and action if possible;
		 **/
		this.button = function(buttonId, buttonProperties) {

			// titleBarButtons - 8; call initButtons
			this._initButtons();

			// titleBarButtons = 12; updated logic flow
			var buttonAttrib = _self.buttonAttribs[buttonId];

			if (!buttonAttrib) {
				// we don't know the buttonId;
				// this shouldn't happen now that this class defines the valid button IDs
				return;
			}

			// If no buttonProps are in View, use props from defaultView from _getDefaultButtonProperties.
			// If no buttonProps are in defaultView, _getDefaultButtonProperties will return {action:'none'}
			buttonProperties = buttonProperties ? buttonProperties : this._getDefaultButtonProperties(buttonId);

			if (buttonAttrib.currentProps === buttonProperties) {
				return;
			}

			// new button, clear current button
			_clearCurrentButton(buttonAttrib);

			if (buttonProperties.action === 'none') {
				// either it was already 'none' or we just cleared it; done!
				return;
			}

			// First, add the Image and the Text (using both only works for left at present)
			var html = '';
			if (buttonProperties.image) {
				var imgProp = buttonProperties.image;
				html += '<img src="' + imgProp.url + '" width="' + imgProp.width
						+ '" height="' + imgProp.height + '" style="vertical-align: middle;" />';
			}
			if (buttonProperties.text) {
				html += buttonProperties.text;
			}
			buttonAttrib.element.innerHTML = html;

			// Then bind any actions if necessary
			if (buttonProperties.action) {
				var theView = MOB.views.currentView();
				// if the action provided is not a function, look up the function from the View
				var func = typeof buttonProperties.action === 'function' ?
						buttonProperties.action : theView[buttonProperties.action];
				_addEvent(buttonAttrib.element, _touchEvent, func);
			}

			// Add custom class, and make active
			if (buttonProperties.class) {
				util.addClass(buttonAttrib.element, buttonProperties.class);
			}
			util.addClass(buttonAttrib.element, 'active');

			buttonAttrib.currentProps = buttonProperties;
		};

		this._initButtons = function() {
			if (this.buttonInitComplete) {
				return;
			}
			this.buttonInitComplete = true;

			// titleBarButtons - 9; get defaultView; set defaultButtons
			var defaultViewName = MOB.defaultView;
			var defaultView = MOB.views.getView(defaultViewName);
			_self.defaultButtons = defaultView.buttons ? defaultView.buttons : {};
		};

		this._getDefaultButtonProperties = function(buttonId) {
			// titleBarButtons - 10; if no default view return hideButton {action: none}
			var defaultButton = _self.defaultButtons[buttonId];
			return defaultButton ? defaultButton : hideButton;
		};

		_adjustViewportHeight = function(){
			var h;

			h = window.innerHeight - MOB.elements.titleBar.offsetHeight;

			MOB.elements.views.style.height=h + "px";

		}


		_clearCurrentButton = function(buttonAttrib) {

			if (buttonAttrib && buttonAttrib.currentProps) {

				var props = buttonAttrib.currentProps;

				// Make inactive, and remove custom class
				util.removeClass(buttonAttrib.element, 'active');
				if (props.class) {
					util.removeClass(buttonAttrib.element, props.class);
				}

				// Then unbind any actions if necessary
				if (props.action) {
					_removeAllEventHandlers(buttonAttrib.element, _touchEvent);
				}

				// Clear the button's image or text
				buttonAttrib.element.innerHTML = '';
				buttonAttrib.currentProps = null; // bug fix

			}
		};

		_addEvent = function(element, listener, handler) {
			if (!(element in _buttonEvents)) {
				// add object as property for element
				_buttonEvents[element] = {};
			}

			if (!(listener in _buttonEvents[element])) {
				// add empty array as property for listener
				_buttonEvents[element][listener] = [];
			}

			// push handler function onto array for listener
			_buttonEvents[element][listener].push(handler);
			element.addEventListener(listener, handler, false);
		};

		_removeAllEventHandlers = function(element, listener) {

			if (element in _buttonEvents) {
				var handlers = _buttonEvents[element];
				if (listener in handlers) {
					var buttonEvents = handlers[listener];
					for (var i = buttonEvents.length; i--; ) {
						var handler = buttonEvents[i];
						element.removeEventListener(listener, handler, false);
					}
				}
			}

		};
	};
})(window);
