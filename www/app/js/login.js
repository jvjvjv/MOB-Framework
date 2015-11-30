(function(){
	console.log ('init login');
	var page = MOB.views.pages.login = {
		title : 'Sign In',
		buttons : {
			left : {
				text : 'Cancel',
				action : 'goBack'
			}
		},
		elements : {
			// List of querySelector-compatible elements to easily reference in below methods
			btnSignIn : 'button[data-action="sign-in"]',
			btnFacebook : 'button[data-action="facebook"]',
			btnCancel : 'button[data-action="cancel"]'
		},
		events : [
			{
				element : 'btnSignIn',
				event : 'tap',
				handler : 'signIn'
			},
			{
				element : 'btnFacebook',
				event : 'tap',
				handler : 'signInWithFacebook'
			},
			{
				event : 'loginsuccess',
			},
			{
				element : 'btnCancel',
				event : 'tap',
				handler : 'goBack'
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
		signIn : function() {
			MOB.events.custom ('loginsuccess',document);
		},
		signInWithFacebook : function() {
			alert ("Cannot sign in with Facebook Yet.");
		},
		loginsuccess : function () {
			MOB.views.go('home', {
				loggedIn : true
			});
		},
		goBack : function() {
			MOB.views.goBack();
		}

	}
	MOB.registerView("login", page);
})(document)