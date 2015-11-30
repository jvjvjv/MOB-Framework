(function(){
	console.log ( 'init views_demo' ); 
	var page = {
		titleBar : true,
		title : "Examples: MOB.views",
		elements : {
			btn : '.button',

			template : '.template',
			divTemplateOutput : '.template-output'
		},
		events : [
			{
				element : 'btn',
				event : 'tap',
				handler : 'handleButton'
			}
		],
		onEnter : function() {
		},
		onExit : function() {
			page.element.divTemplateOutput.innerHTML = '';
		},
		handleButton : function (ev) {
			var el = util.travelUpTo ( ev.target , 'div' );

			action = el.getAttribute ('data-action');

			switch ( action ) {
				case 'go-login-save':
					MOB.views.go('login',null);
				break;
				case 'go-login':
					MOB.views.go('login',{},false);
				break;
				case 'go-back':
					MOB.views.goBack();
				break;
				case 'go-back-home':
					MOB.views.goBackTo('home');
				break;
				case 'template':
					var templateHTML = MOB.views.template ( page.element.template.innerHTML , {
						name : "Jason",
						address : "PO Box 1226"
					});

					page.element.divTemplateOutput.innerHTML += templateHTML;
				break;
				case 'menu':
					MOB.views.menuToggle();
				break;
			}
		}
	}
	MOB.registerView('views_demo',page);
})(document)