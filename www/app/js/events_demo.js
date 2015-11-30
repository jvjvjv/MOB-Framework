(function(){
	console.log ( 'init events_demo' ); 
	var page = MOB.views.pages.events_demo = {
		titleBar : true,
		title : "Examples: MOB.events",
		elements : {
			btnEvent : '[data-action="event"]',
			btnAlert : '[data-action="alert"]'
		},
		events : [
			{
				element : 'btnEvent',
				event : 'tap',
				handler : 'triggerEvent'
			},
			{
				element : 'btnAlert',
				event : 'tap',
				handler : 'showAlert'
			}
		],
		onEnter : function() {
		},
		onExit : function() {
		},
		triggerEvent : function() {
			MOB.events.trigger ( 'tap' , page.element.btnAlert );
		},
		showAlert : function() {
			alert ("Was the Alert button pressed?");
		}
	}
	MOB.registerView("events_demo", page);
})(document)