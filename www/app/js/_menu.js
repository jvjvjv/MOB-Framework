(function(){
	console.log ( 'init _menu' ); 
	var page = {
		elements : {
			btnHome : '[data-action="go-home"]',
			btnUtils : '[data-action="go-utils"]',
			btnEvents : '[data-action="go-events"]',
			btnViews : '[data-action="go-views"]',
			btnTitleBar : '[data-action="go-titlebar"]',
			btnBlank : '[data-action="blank"]',

			btnViewHistory : '[data-action="view-history"]'
		},
		events : [
			{
				element : 'btnHome,btnUtils,btnEvents,btnViews,btnTitleBar,btnBlank',
				event : 'tap',
				handler : 'go'
			},
			{
				element : 'btnViewHistory',
				event :'tap',
				handler : 'viewHistory'
			}
		],
		viewHistory : function() {
			var theHistory = MOB.views.viewHistory;
			var text = '';

			for ( var i = 0, len = theHistory.length ; i < len ; i++ ) {
				text += '[' + theHistory[i].id + ']';
				if ( i != len -1 ) text += ', ';
			}

			alert ( text );
		},
		go : function(ev) {
			var el = ev.target;

			switch (el.getAttribute('data-action')) {
				case 'go-home':
					MOB.views.goBackTo('home');
				break;
				case 'go-utils':
					MOB.views.go('util_demo');
				break;
				case 'go-events':
					MOB.views.go('events_demo');
				break;
				case 'go-views':
					MOB.views.go('views_demo');
				break;
				case 'go-titlebar':
					MOB.views.go('titlebar_demo');
				break;
				case 'blank':
					MOB.views.go('blank');
				break;
				default:
					alert ("Oops?");
			}
			MOB.views.menuToggle();
		}
	}

	MOB.registerMenu("_menu",page);
})(document)