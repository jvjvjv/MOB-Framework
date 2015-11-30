(function(){
	console.log ( 'init titlebar_demo' ); 
	var page = MOB.views.pages.titlebar_demo = {
		titleBar : true,
		title : "Examples: MOB.titleBar",
		elements : {
			btnChangeTitle1 : '[data-action="change-title"]',
			btnChangeTitle2 : '[data-action="change-title2"]',

			btnAddClass : '[data-action="add-class"]',
			btnRemoveClass : '[data-action="remove-class"]',

			btnShow : '[data-action="show"]',
			btnHide : '[data-action="hide"]',

			btnButtonMake : '[data-action="button-make"]',
			btnButtonDestroy : '[data-action="button-destroy"]',
		},
		events : [
			{
				element : 'btnChangeTitle1,btnChangeTitle2,btnAddClass,btnRemoveClass,btnShow,btnHide,btnButtonDestroy,btnButtonMake',
				event : 'tap',
				handler : 'handleButton'
			}
		],
		onEnter : function() {
		},
		onExit : function() {
			// Reset button state for MOB.titleBar.button()
			if ( page.thereIsAbutton ) {
				MOB.titleBar.button ('right');
				util.addClass ( page.element.btnButtonDestroy , 'hidden' );
				util.removeClass ( page.element.btnButtonMake , 'hidden' );
			}
		},
		handleButton : function(ev) {
			var el = ev.target;
			var action = el.getAttribute('data-action');

			switch (action) {
				case 'change-title':
					MOB.titleBar.title('HI');
				break;
				case 'change-title2':
					MOB.titleBar.title('LO');
				break;
				case 'add-class':
					MOB.titleBar.class('add','red');
				break;
				case 'remove-class':
					MOB.titleBar.class('remove','red');
				break;
				case 'hide':
					MOB.titleBar.hide();
				break;
				case 'show':
					MOB.titleBar.show();
				break;
				case 'button-make':
				page.thereIsAbutton = true;
					MOB.titleBar.button ('right',{
						text : "Alert",
						action : "showAlert"
					});
					util.removeClass ( page.element.btnButtonDestroy , 'hidden' );
					util.addClass ( page.element.btnButtonMake , 'hidden' );
				break;
				case 'button-destroy':
					page.thereIsAbutton = false;
					MOB.titleBar.button ('right');
					util.addClass ( page.element.btnButtonDestroy , 'hidden' );
					util.removeClass ( page.element.btnButtonMake , 'hidden' );
				break;
			}
		},
		showAlert : function() {
			alert ("clickie!");
		}
	}
	MOB.registerView("titlebar_demo", page);
})(document)