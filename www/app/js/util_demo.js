(function(){
	console.log ( 'init util_demo' ); 
	var page = {
		titleBar : true,
		title : "Examples: util.js",
		elements : {
			btnLoad: '[data-action="alert"]',
			btnAddClass: '[data-action="add-class"]',
			btnRemove: '[data-action="remove-class"]',

			divMyClass : '.my-class'
		},
		events : [
			{
				element : 'btnLoad',
				event : 'touchend',
				handler : 'loadAlert'
			},
			{
				element : 'btnAddClass',
				event : 'touchend',
				handler : 'addClass'
			},
			{
				element : 'btnRemove',
				event : 'touchend',
				handler : 'removeClass'
			},
		],
		onEnter : function() {
		},
		onExit : function() {
		},
		loadAlert : function() {
			util.loadScript ( MOB.app.options.folders.js + '_alert' , 'JS' );
		},
		addClass : function() {
			util.addClass ( page.element.divMyClass , 'purple' );
		},
		removeClass : function() {
			util.removeClass ( page.element.divMyClass , 'purple' );
		}
	}
	MOB.registerView("util_demo", page);
})(document)