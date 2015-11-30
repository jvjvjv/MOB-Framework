# MOB Framework

* Version 0.8
* Author: Jason Vertucio <me@jasonvertucio.com>
* Contributors: Jim B

MOB Framework is a Mobile Applications framework created by me!

MOB Framework was originally built to work as a Mobile Framework within PhoneGap applications, and is targeted at iOS and Android compatibility.  It is built based on the principles that it be simple, have minimal features, and play nice with other JavaScript modules.

Give it a whirl. I hope you like it and you find it very useful.

## Copyright and License

Copyright (C) 2013-2014, Jason Vertucio.
Licensed under GPLv3. <https://www.gnu.org/licenses/gpl.html>

This Framework includes the Touchy library by Stefan Liden, licensed under MIT.

----------

## Version Changes

#### 0.8

* Added options parameter to **MOB.init()**
* App Views area now takes titlebar into account, both when hidden and shown
* Syncrhonised the CSS file with its SASS source.
	* Buttons in titlebar have been given a larger tap area
* sdgfhuymftyh


#### 0.7.1

* Moved everything back to `www` except any files using customizeable tokens

#### 0.7

* Updated Kitchen Sink demo
* Modified to work with PhoneGap 3.4.0
	* `src` folder instead of `www` folder
	* ant tasks for copying from `src` into `www`
	* Better utilization of properties files 

#### 0.6

* Bug fixes in util.js
* Added "defaultView" concept to allow "menu" button to be overridden
	* (still needs to be documented)
* Changed folder structure
	* `www` folder added
	* Any folders and files not required at runtime have been moved to root folders
	* `template` folder added and all templates moved accordingly.
* Other minor changes

#### 0.5.5

* Fixed page event binding issue involving forms.

#### 0.5.4

* Fixed an issue where Tray Views could not be opened as soon as app inits.

#### 0.5.3

* Edited title bar's events to all respond to taps.

#### 0.5.2

* Edited the padding around the title bar's buttons to make them easier to press on a mobile phone.
* Moved `sass` folder inside `framework` folder

#### 0.5.1

* Changed __click__ events to __tap__.
* Fixed Issue #1: If ViewController does not have an "elements" list, app crashes upon initial load.
* Updated Demo App with a blank page, all __clicks__ to __taps__, and added a click-to-tap convertor to `app.js` for desktop testing. 

#### 0.5

* Added ability to use a whole class of elements in __pages.events__ property list.
* Fixed a bug where **MOB.views.goBackTo()** was broken.
* when titlebar is hidden or shown, the View is no longer locked from scrolling.
* User can now call **MOB.views.menuToggle()**
* Some CSS edits
	* Added button-style `<li>` tags.
	* Added `<h1>` and `<h2>` tags to menu.
	* class `.template` is now hidden.
* Updated MOB Framework Demo with code examples.


#### 0.4.2

* Renamed `load.json` to `config.json`

#### 0.4.1

* Renamed `_framework` folder to `framework` for Android app compatibility.* 

#### 0.4

* removed **_blurAllInputs()**, a slow and buggy function
* Implemented menu. 

#### 0.3.1

* Edited **MOB.views.go()** to allow views to be saved in the viewHistory, so **MOB.views.goBack()** can skip pages.
* Added a blur during page hide to hide the onscreen keyboard.

#### 0.3

* Views now have parameters you can pass in when using **MOB.views.go()**
* View History now passes parameters when going Back

#### 0.2

* Title Bar controller
* Pages.js now has some references to "Views" instead of "Pages".
* You can now trigger a custom event in Events with **MOB.events.trigger()**
* MOB will now load all CSS/HTML/JavaScript for each View specified in ~~load.json~~ config.json
* template.js updated to reflect new functionality.
* ***NEW!!!*** Added an Apache Ant build.xml to easily create new Views.


### Known Issues and To-Do:

* `pages.js` should be renamed to `views.js` and everything changed from referencing pages to views
* The `framework` folder could be renamed to `mob` to coincidee with the name of this project.
* The titlebar is not iOS 7 compatible on the framework level.



## Quick Start

The MOB Framework was originally created to serve as a framework for Web Apps in PhoneGap. This section will cover project creation accordingly.

1. After creating your project (`phonegap create my_project`), copy the contents of this project into the directory -- remember to avoid copying any version control files
2. Update `src/config.xml` with any settings you have added to `www/config.xml` 
2. Edit your source code in src
3. Use the command `ant build-web` to build the `www` folder before running `phonegap build [platform]`.
4. If you are using a version control system, remember to mark local.properties as ignore.

### index.html

The `index.html` contains the basic layout of the application you will be building. There should be no need to edit this if you are using MOB Framework out-of-box.

### config.json

* options
	* defaultTitle: The default title for title bar
	* folders: points to css, js, and html folders
	* menu: boolean expression on whether or not the left slideout menu will be used
* elements
	* app: The entire app is wrapped within this div
	* titleBar: the actual title bar
	* title: the text portion of the title bar
	* menu: if a slideout menu is utilised, this will point to that
	* tray: if a slideout tray is utilised, this will point to that
	* views: the main container that will contain the HTML for all of the views
* defaultView: The default view (used for default titlebar buttons)
* homeView: the initial View to display once loaded
* views: An array of the HTML files to load and place into the _views_ element, and the JS files to the associated Views
* js: An array of any extra Javascript files to load
* css: An array of the CSS files to load
* menu: The HTML file to load and place into the _menu_ element

### Views: *.html

Each View should be a separate file for ease of organisation and editing.
Every View should be wrapped in a SECTION tag:

	<section id="[XXX]" class="app-view">
		[CONTENT GOES HERE]
	</section>

Each View will contain all of its templates. The following example illustrates how this is done.

	<aside class="template" id="TEMPLATE_ID">
		<li class="%TEMPLATE_TAG%">%ANOTHER_TEMPLATE_TAG%
		</li>
	</aside>
	
The template is wrapped in an `<aside class="template">` element. A template tag will be entered in ALL CAPS and surrounded by a percent symbol (%) on each side. The `<aside>` is not used for the template's purposes.


### ViewControllers: *.js

There ***must*** be a MOB.views.pages.[XXX] to match each HTML View created.

Each ViewController should be a separate file for ease of organisation and editing. The property list for each ViewController looks like this:

* title _(optional)_: The title of the page. If none is specified, the defaultTitle is used.
* titleBar: either _false_ or a property list containint:
	* class: a CSS class to apply to the titleBar
	* display: _true_ or _false_ 
* buttons: A property list for any buttons that would appear on the left or right side of the title bar
	* action: The name of the function to run when the button is clicked
	* text: the text to display 
	* image: the url relative to the main folder, height and width of the button
	* **NB** Only text OR image should be used. Never both
* elements: A property list of elements on the associated View
* events : An array of objects, each containing
	* element: string representation of the page element(s) defined above
		* (more than one element may be specified as a comma-separated list)
	* event: The event to listen for
	* handler: A string representation of the method attached to the View
* page.onEnter()
	* Called whenever a View becomes active
* page.onExit()
	* Called whenever a View becomes inactive
* page.otherFunctions()
	* Any number of functions may be added to each JS ViewController

### Styling: *.css

All CSS should be in separate files for easy organisation and editing.

Each selector should be prefaced with #[XXX] for the specific View.

A global CSS file should be created for elements that will be re-used on multiple Views, and will not need a View-prefix.

## Build-In MOB Framework JS

### mob.js

The Mobile Framework's main script file, globally namespaced to MOB, encloses many of the other included modules, including Views and Events. The following will most likely be the only functions you'll need.

#### MOB.init()
##### Summary
Loads the MOB Framework and initializes the application.
##### Syntax
_MOB.init()_
##### Parameters
	options	Object	Property list of customisable options.
##### Description
**MOB.init()** initializes the Framework by loading `config.json`. All options, configuration, extra files, are initialized from here. Once completed, it triggers the __init__ event on the document level.

Currently the only option available is _callback_, which will call the specified function after all init procedures are complete.

#### MOB.registerView()
##### Summary
Loads the HTML and CSS for a View and registers the View within the app.
##### Syntax
_MOB.registerView ( viewID , viewObj )_
##### Parameters
	viewID	String	The name of the View to register
	viewObj	Object	The object that contains the core data and functionality for that viewController
##### Description
**MOB.registerView()** is attached to the bottom of each viewController already, so there may be no need to add this to any application. 

#### MOB.registerTrayView()
##### Summary
Loads the HTML and CSS for a Tray View and registers the Tray View within the app.
##### Syntax
_MOB.registerTrayView ( viewID , viewObj )_
##### Parameters
	viewID	String	The name of the View to register
	viewObj	Object	The object that contains the core data and functionality for that viewController
##### Description
If the need to create a Tray View arises, the easiest way is to use the template to create a regular view, and then change the **MOB.registerView()** function to **MOB.registerTrayView()**. When using Ant to create the View, remember to update the `config.json` file.

#### MOB.registerMenu()
##### Summary
Loads the HTML and CSS for the Menu and registers it within the app.
##### Syntax
_MOB.registerMenu ( viewID , viewObj ))_
##### Parameters
	viewID	String	The name of the View to register
	viewObj	Object	The object that contains the core data and functionality for that viewController
##### Description
If you wish to use a left-side navigation menu in your app, the easiest way is to use the template to create a regular view, and then change the **MOB.registerView()** function to **MOB.registerMenu()**. When using Ant to create the View, remember to update the `config.json` file.


----------------------------------------

### MOB.events

Allows for triggering events and custom events.

#### MOB.events.trigger()
##### Summary
Triggers an event
##### Syntax
_MOB.events.trigger ( eventName , element )_
##### Parameters
	eventName	String	The event to trigger
	element		Object	The DOM Element to trigger the event on (optional).
##### Description
If the _element_ is undefined when calling the function, the event is dispatched onto the _document_.

----------------------------------------

### MOB.views

Handles all page transitions

#### MOB.views.loadHTML()
##### Summary
Loads a set of HTML files and places them into the DOM Tree
##### Syntax
_MOB.views.loadHTML ( folderName , fileArray , element , callback )_
##### Parameters
	folderName	String		The path to the HTML files
	fileArray	Array		An array of files to load
	element		Object		The DOM element to place files into
	callback	Function	The function to call once all files have been loaded
##### Description
**MOB.views.loadHTML()** loads all specified HTML files, and appends them in the order loaded to the specified element. If none is specified then they are apprended to the body. Once the final file has been loaded and placed in the DOM, the callback function is called.

#### MOB.views.getView()
##### Summary
Gets the ViewController for the specified View.
##### Syntax
_MOB.views.getView ( viewID )_
##### Parameters
	viewID	String	The ID of the view to find
##### Description
**MOB.views.getView()** searches the list of Views that have been loaded and returns its ViewController.

If there is no matching viewID, **MOB.views.getView()** returns _false_.

#### MOB.views.getCurrentView()
##### Summary
Returns the current View.
##### Syntax
_MOB.views.currentView()_
##### Description
I don't even know why this is here. I may deprecate this function.

#### MOB.views.getCurrentViewName()
##### Summary
Returns the current View's ID.
##### Syntax
_MOB.views.currentViewName()_
##### Description
**MOB.views.getCurrentViewName()** comes in handy when you need to get the ID of the View, but don't need the actual object -- such as in **MOB.views.getCurrentView()**.


#### MOB.views.go()
##### Summary
Switches Views.
##### Syntax
_MOB.views.change ( viewID , parameters , saveInHistory )_
##### Parameters
	viewID			String	The ID of the page to change to.
	parameters		Object	A set of parameters to pass to the new View.
	saveInHistory	Boolean	Allow MOB.views.goBack() to go back to this View.
##### Description
**MOB.views.go()** uses public methods **MOB.views.show()** and **MOB.views.hide()** to perform its tasks. Generally, the developer will not need these functions, so it is best to use **MOB.views.go()** to handle View switching.

#### MOB.views.goBack()
##### Summary
Travels one page up in the history
##### Syntax
_MOB.views.goBack ()_
##### Description
**MOB.views.goBack()** pops the current View off of the history and the nusees **MOB.views.change()** to physically show the 'previous' View.

#### MOB.views.goBackTo()
##### Summary
Travels to the latest instance of the specified View, if the View in the History.
##### Syntax
_MOB.views.goBackTo ( viewID )_
##### Parameters
	viewID	String	The ID of the page to go back to.
##### Description
**MOB.views.goBackTo()** uses the viewHistory to match the given viewID. If not found, an error is displayed on the Console, and the viewHistory is restored.


#### MOB.views.template()
#### Summary
Takes a set of text and parses template tags
#### Syntax
_MOB.views.template ( html , tags )_
#### Parameters
	html	Mixed	Either the DOM Element or text to parse
	tags	Object	A property-list of tags and their replacement text
#### Description
**MOB.views.template()** goes through the text passed into it, and looks for each template tag, replacing it with the text defined for the tag.
#### Example
In the following HTML:
	
	<li class="%CLASS_NAME%" data-id="%ID_NUMBER%">%DESCRIPTION%</li>
	
Calling the following JavaScript:

	MOB.views.template ( html , { 
		class_name : "blue" , 
		id_number : "089345",
		description : "MATH-101: Learn addition and subtraction"
	})
	
will return the following HTML

	<li class="blue" data-id="089345">MATH-101: Learn addition and subtraction</li>


#### MOB.views.menuToggle()
##### Summary
Opens or closes the slideout menu.
##### Syntax
_MOB.views.menuToggle()_
##### Parameters
	none
##### Description
**MOB.views.menuToggle()** is an easy way to open and close the menu tray.


-----------------------------------------
### MOB.titleBar
The functions associated with the title bar.

#### MOB.titleBar.init()
##### Summary
Initializes the titleBar class.
##### Syntax
_MOB.titleBar.init()_
##### Description
**MOB.titleBar.init()** looks at the MOB.elements object, and saves the elements it will require for its own methods

#### MOB.titleBar.title()
##### Summary
Sets the title in the Title Bar
##### Syntax
_MOB.views.title ( title )_
##### Parameters
	title	String	The text to appear in the Title Bar
##### Description
**MOB.views.title()** Changes the text in the Title Bar to whatever is specified. If no text is specified, or title is omitted, then **MOB.views.title()** uses the text specified under the defaultTitle property given in _config.json_.

#### MOB.titleBar.class()
##### Summary
Adds or removes a class to the titleBar
##### Syntax
_MOB.titleBar.class ( action , className )_
##### Parameters
	action		String	"add" or "remove" to add or remove the class specified
	className	String	The class to add or remove
##### Description
**MOB.titleBar.class()** is an encapsulated version of **util.addClass()** and **util.removeClass()** for the title bar. It takes the `className` passed in and calls the appropriate utility function to effect the result.


#### MOB.titleBar.show()
##### Summary
##### Syntax
##### Parameters
##### Description

#### MOB.titleBar.hide()
##### Summary
##### Syntax
##### Parameters
##### Description

#### MOB.titleBar.button()
##### Summary
Displays or removes a left or right-side button in the titleBar
##### Syntax
_MOB.titleBar.button( side , buttonProperties )_
##### Parameters
	side				String
	buttonProperties	Object
##### Description
**MOB.titleBar.button()** requires the `side` parameter so it knows on which side of the title to place the button.

If `buttonProperties` is given, **MOB.titleBar.button()** reads and creates the button based on the following object type.

	{
		text : "text", // The text the button would have
		image : {
			url   : "./img/text.png", // The image URL
			width : '17px',
			height: '22px'
		},
		class : "red" // Add a class to the button
		action : "functionName" // The name of the function to call when tapped
	}
	
`buttonProperties` should only have text _or_ image, never both. 

If `buttonProperties` is not given, the button on that side will be erased.

If config.json's menu option is set to true, then no action will occur on the left side of the titlebar.

----------------------------------------

### util.js

Contains a set of utility functions that may come in handy.

#### util.loadScript()
##### Summary
Loads a JavaScript or CSS file
##### Syntax
_util.loadScript ( filename , type )_
##### Parameters
	filename	String	The full path and filename of the script to load.
	type		String	js or css, depending on the type of script being loaded.
##### Description
**util.loadScript()** creates a new DOM element for the script requested, which automatically loads the file.
	
#### util.addClass()
##### Summary
Adds a CSS class to the specified DOM element
##### Syntax
_util.addClass ( DOMelement , classText )_
##### Parameters
	DOMElement	Object	The actual DOM element, or even an array of elements
	classText	String	The class to add to the element
##### Description
**util.addClass()** checks for a match of the class, and if none, adds it

#### util.removeClass()
##### Summary
Removes a CSS class to the specified DOM element
##### Syntax
_util.removeClass ( DOMelement , classText )_
##### Parameters
	DOMElement	Object	The actual DOM element, or even an array of elements
	classText	String	The class to remove from the element
##### Description
**util.removeClass()** uses RegExp to remove the class from the className property.

#### util.travelUpTo()
##### Summary
Travels up the DOM tree from the source elemnt until the target element is hit.
##### Syntax
_util.travelUpTo ( sourceElement , targetElement )_
##### Parameters
	sourceElement	Object	The actual DOM element from which we start the search
	targetElement	String	The target HTML element to stop at
##### Description
**util.travelUpTo()** begins at the source element and travels to each subsequent parent, until either the target HTML tag is found, or it reaches the top (HTML).

If **util.travelUpTo()** reaches the top of the DOM tree, _null_ is returned. Otherwise, the target DOM element is returned.
##### Example
In the following eamples, we will use this HTML:

	<html>
	<body>
		<div id="header">
			<h1>Hello, my friends</h1>
		</div>
		
		<div id="content">
			<p id="hello-world-text">Hello, world!</p>
		</div>
		
		<script>
			helloWorldText = document.querySelector ('#hello-world-text');
		</script>
	</body>
	</html>

Calling *util.travelUpTo ( helloWorldText , "div")* will return the DOM element for `<div id="content">`, but calling *util.travelUpTo ( helloWorldText , "span" )* will return null.


#### util.sortArrayOfObjects()
##### Summary
Takes an array of objects and sorts them by the given key
##### Syntax
_util.sortArrayOfObjects ( theArray , key , order )_
##### Parameters
	theArray	Array	The array that will be sorted.
	key			String	The key to search for in the array
	order		String	Either ASC or DESC to sort by 'key' from front-to-back or back-to-front
##### Description
**util.sortArrayOfObjects()** will take an entire array full of objects and sort them by the given key. If _theArray_ is not valid, or the key does not appear in the array, _theArray_ is returned untouched.
##### Example
This example uses the following Object:

	theArray = [
		{
			name: "Farquhar",
			gender: "m",
			order: 1
		},
		{
			name: "Carol",
			gender: "f",
			order: 2
		},
		{
			name: "Pat",
			gender: "?",
			order: 3
		}
	]

Calling **util.sortArrayOfObjects(theArray,'gender','ASC')** will sort the above array to the order 3, 2, 1, while calling **util.sortArrayOfObjects(theArray,'city','ASC')** will return the same array, as 'city' is not a property in the array.


<!--
#### function
##### Summary
##### Syntax
##### Parameters
##### Description
-->

--------------------

## ANT Scripts

_(This article needs improvement.)_

For help, enter `ant help` in the main folder. It will provide a list of available commands and their descriptions.

--------------------

## Included CSS

_(This article needs improvement.)_

### Column Layout

MOB Framework does include a column layout CSS. I'm not sure where it came from, however. The column layout is based on a 16-column grid, and very easy to use. Mostly, each row can be defined by the class _.new-row_  and the columns by the classes _.one-column_, _.two_columns_, _.three_columns_, and so forth.

### Titlebar and Screen Elements

MOB Framework gives a basic titlebar layout, with or without slideout menu bar.

### Form Elements

MOB Framework provides basic form element customization, including new style for mobile buttons, text boxes, and text areas.

--------------------

## Adding new CSS and JavaScript

The convention when using MOB Framework is to prefix any new scripts or stylesheets with an underscore, and then add them to the appropriate object in __config.json__. Third-party components, like Touchy should be prefixed with two underscores.

This is done just so the programmer can easily visually spot which source files are views, extra libraries, and third-party content.

--------------------

## Suggestions for modification of Framework

Any ideas on how to improve the framework or customise it for the project? Email <me@jasonvertucio.com>