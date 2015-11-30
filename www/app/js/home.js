(function(){
	console.log ( 'init home' ); 
	var page = MOB.views.pages.home = {
		title : "MOB Framework Demo",
		titleBar : true,
		elements : {
			btnLogin : 'button[data-action="next"]',
			spanApiKey : '[data-key="twitter-api-key"]'
		},
		events : [
			{
				element:'btnLogin',
				event:'tap',
				handler:'goToLogin'
			}
		],
		onEnter : function(params) {
			if ( !params ) return false;
			if ( params.loggedIn ) {
				page.loggedIn = true;
				page.currentBtn = {
					html : page.element.btnLogin.innerHTML,
					className : page.element.btnLogin.className
				};
				page.element.btnLogin.innerHTML = "Go back a View";
				util.removeClass ( page.element.btnLogin , 'green' );
			}

			page.displayKey();
		},
		onExit : function() {
			page.loggedIn = false;
			if ( page.currentBtn ) {
				page.element.btnLogin.innerHTML = page.currentBtn.html;
				page.element.btnLogin.className = page.currentBtn.className;
				page.currentBtn = null;
			}
		},
		displayKey:function(){
			page.element.spanApiKey.innerHTML = APP.twitterAPIKey;
		},
		goToLogin : function() {
			if ( !page.loggedIn ) MOB.views.go('login'); 
			else MOB.views.goBack();
		},
		menu : function() {
			MOB.views.menuToggle();
		}
	}
	MOB.registerView("home", page);
})(document)