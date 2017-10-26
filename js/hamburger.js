/*
	By setting 'use strict' we ensure that we are building clean code and not breaking any rules. Helps with future-friendliness.
*/
'use strict';


/*
	Before we start on this tutorial, it is worth noting that within JavaScript we have a whole set of predefined objects, methods (functions that we run on objects), and properties that we can make use of. In this tutorial we will introduce you to some of the most common and useful ones for getting started on integrating JavaScript into your pages.

	Our first example is the 'console' object, which refers to our developer tool's console. In the example below, we can use the 'log' method to send messages to our developer's console. Note the structure of the object/method declaration:

	object.method(arguments);
	console.log("Message to send to the console.");
*/
console.log("JavaScript is running.");




/*
	Much like our 'console' object, we have a 'window' object that we can call on to find out things about our browser window. In this case, we are using the 'innerWidth' property to check the width of the 'window' object which we then cast into the 'width' variable. Note the structure of this statement:

	var nameOfVariable = object.property;
	var width = window.innerWidth;
*/
var width = window.innerWidth;

/*
	By stating "Window width: "+width in the log function, we are telling the log to insert the value of the width variable into our console message. Even though 'width' is a integer variable, JavaScript understands that we do not want to perform a mathematic operation here, and instead coerces the width variable into a string for output.
*/
console.log("Window width: "+width+"px");


/*
	Below we are selecting elements from our DOM (Document Object Model). By casting these elements into variables we can then find out information about them, or set their values much more easily than having to repeatedly select them.

	Note that we are again using variables to capture these HTML objects, but in this case we are calling on the 'document' (DOM) object and using the 'querySelector' method to find them. The 'querySelector' method returns the first HTML object in the DOM that it finds with the given CSS-style selector. Note the structure:

	var nameOfVariable = object.method(argument);
	var navToggle = document.querySelector("#nav-toggle");

	This finds us the first element with the ID of 'nav-toggle', and then casts it into a variable for later access.
*/
var navToggle = document.querySelector("#nav-toggle");

/*
	Here we are performing a similar action to the one above, but instead finding the element with the ID of 'nav-items'.
*/
var navItems = document.querySelector("#nav-items");

/*
	For accessibility purposes (explained later), we also want to capture the first link of the list in a variable for later use.
*/
var navFirstItem = document.querySelector("#nav-items a");


/*
	As is demonstrated further down, we can tie 'event listeners' to our objects to have them act when a user interacts with the page. If you uncomment the case below (as well as line ___) we have added a listener to our 'window' object which listens to when the user has resized the window. This allows the menu to collapse and expand as needed when the user resizes the browser window.

	Note that to have it both collapse and expand we need to ensure that:
	(a) The width variable is updated as the user resizes the window (line 61)
	(b) There is a condition for if the window is wider than 500px (lines 112-119)
	(c) All of this is contained in the event listener that watches for resizing of the window (lines 62 & 121)
*/
window.addEventListener("resize", function() {
	width = window.innerWidth;


/*
	Below we have an example of a simple if/then statement. In this case, we are checking for if the 'width' variable is less than 500 (pixels) that it should then perform a series of statements for us, as we want it to change our navigation when the width of the browser window is under this point. Note the structure:

	if (condition) { ... things to run }
	if (width < 500) { ... }
*/
if (width < 500) {

	console.log("Window width is less than 500px, collapsing menu.");

	/*
		The statement below is very similar to what we have seen earlier, it is just unpacking an object a bit more:

		navToggle - our navToggle element we selected earlier.
		classList - a property that contains all the classes applied to an element.
		remove("") - a method that removes the class specified (by name) as it's argument.

		So in this case our statement of navToggle.classList.remove("hidden") is saying: (a) select #nav-toggle, (b) select its classes, and (c) remove the class of 'hidden'.
	*/
	navToggle.classList.remove("hidden");

	/*
		For every HTML object, we can get and set attributes. In this case, to ensure that our navigation toggle button is now visible to accessibility tools we need to set 'aria-hidden' to 'false'. For this purpose, we have the 'setAttribute' method used below.
	*/
	navToggle.setAttribute("aria-hidden", "false");

	/*
		Similar to where we removed classes earlier, we can also use the 'add' method in combination with the classList property to add classes to the given element.
	*/
	navItems.classList.add("hidden");

	/*
		Since we are now hiding the menu, we need to set the 'aria-hidden' attribute to 'true' for our navigation items (which are now hidden).
	*/
	navItems.setAttribute("aria-hidden", "true");

	/*
		By setting the 'aria-labelledby' attribute, we indicate the relationship between the #nav-items and the #nav-toggle element.
	*/
	navItems.setAttribute("aria-labelledby", "nav-toggle");

}


/*
	Please see line 55 of the code for an explanation of the commented out snippet below.
*/
else {

	navToggle.classList.add("hidden");
	navToggle.setAttribute("aria-hidden", "true");
	navItems.classList.remove("hidden");
	navItems.setAttribute("aria-hidden", "false");

}
});



/*
	We can tie 'event listeners' to our objects to have them act when a user interacts with the page. In the case below we are adding a listener to our '#nav-toggle' element which listens to when the user has clicked on the element.
*/
navToggle.addEventListener("click",
	/*
		Once the user has clicked on the element, we have - in this case - an anonymous (nameless) function that runs a series of statements for us.
	*/
	function() {
		console.log("#nav-toggle has been clicked.");

		/*
			Because we do not know for sure if the navigation items are showing (or not) when a user clicks on the button, we should test and act on both conditions. The if/else statement below checks if #nav-items has a class of 'hidden' using the 'classList.contains(...)' method and acts accordingly.
		*/
		if ( navItems.classList.contains("hidden") ) {
			console.log("#nav-items are hidden, showing them now.");

			/*
				We want to remove the 'hidden' class to ensure that the navigation items become visible.
			*/
			navItems.classList.remove("hidden");

			/*
				Since the menu is now visible, we want to also set the navigation items as visible (to accessibility devices) and the #nav-toggle to understand that the navigation has been expanded.
			*/
			navItems.setAttribute("aria-hidden", "false");
			navToggle.setAttribute("aria-expanded", "true");

			/*
				To assist accessibility devices interpret the menu correctly, refocusing keyboard navigation on the first menu item (once expanded) is worthwhile. This is where selecting our first navigation item in a variable and using the 'focus' method on it allows us to do so.
			*/
			navFirstItem.focus();
		}
		/*
			Otherwise, if the navigation items are already showing...
		*/
		else {
			console.log("#nav-items are showing, hiding them now.");

			/*
				We want to remove add 'hidden' class to ensure that the navigation items are hidden.
			*/
			navItems.classList.add("hidden");

			/*
				Since the menu is now hidden, we want to also set the navigation items as hidden (to accessibility devices) and the #nav-toggle to understand that the navigation has been collapsed.
			*/
			navItems.setAttribute("aria-hidden", "true");
			navToggle.setAttribute("aria-expanded", "false");
		}
	}
);
