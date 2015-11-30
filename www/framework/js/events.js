/******************************************************************************
 * events.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3
 *****************************************************************************/
(function(GLOBAL){
	GLOBAL.Events = function() {

		var _appEvents = ['init','pagehide','pageshow'],
		_eventHandlers = {};

		// Create event handlers for custom events

		for (var i in _appEvents) {
			var j = _appEvents[i];
			_eventHandlers[j] = document.createEvent('Event');
			_eventHandlers[j].initEvent(_appEvents[i],true,true);
		}

		trigger = function ( eventName , element ) {
			if ( typeof element == 'undefined' ) element = document;
			if ( _eventHandlers[eventName] ) {
				element.dispatchEvent ( _eventHandlers[eventName] );
			} else {
				triggerCustom ( eventName , element , false , false );
			}
		}

		triggerCustom = function ( eventName , element ) {
			element = !element ? document : element;
			// var newEvent = new Event (eventName );
			var newEvent = document.createEvent ('Event');
			newEvent.initEvent(eventName,true,true);
			element.dispatchEvent(newEvent);
		}

		return {
			trigger : trigger,
			custom : triggerCustom,
			a : _appEvents,
			e : _eventHandlers
		}
	}
})(window);