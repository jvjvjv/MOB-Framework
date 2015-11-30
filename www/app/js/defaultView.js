(function() {

	console.log('init defaultView');

	/*
	 This is not a 'real' view.
	 It contains default settings that can be applied as needed.
	 Currently, the only values here that are in use are the buttons.
	 */

	var page = MOB.views.pages.defaultView = {
		titleBar: true,
		title: "defaultView",
		buttons: {
			left: {
				image: {url: './framework/img/icon/bars.png', width: '20px', height: '15px'},
				action: MOB.views.menuToggle
			}
		},
		elements: {},
		events: [],
		onEnter: function() {
		},
		onExit: function() {
		},
		save: function(param) {
			console.log(param);
		}
	}
	MOB.registerView('defaultView',page);
})(document)