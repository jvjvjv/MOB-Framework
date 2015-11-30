(function(){
	console.log ( 'init @template@' ); 
	var page = {
		titleBar : true,
		title : "@template@",
		buttons : {
			/*
			left : {
				image : './ap/img/btn.png',
				text : 'Image or Text ONLY',
				action : "save"
			}
			*/
		},
		elements : {
			// List of querySelector-compatible elements to easily reference in below methods
			btnSave : 'button[data-action="save"]'
		},
		events : [
			{
				element : 'btnSave',
				event : 'tap',
				handler : 'save'
			}
		],
		onEnter : function() {
			// Things to do once the page is opened
			// e.g. event binding
		},
		onExit : function() {
			// Things to do when the page exits
			// e.g. removing event binding
		},
		save : function( param ) {
			console.log ( param );
		}
	}
	MOB.registerView("@template@", page);
})(document)