/******************************************************************************
 * elements.js
 * @author Jason Vertucio <me@jasonvertucio.com>
 * @copyright 2013, Jason Vertucio.
 * @license GPLv3
 *****************************************************************************/
HTMLSelectElement.prototype.MOBselect = function() {
	// If it has already been completed, skip
	if ( this.MOB ) return;

	var select, wrapper, captionText, caption, updateCaption;

	updateCaption = function(ev) {
		var newCaption = select.selectedOptions[0].innerHTML;
		caption.innerHTML = newCaption;
	}

	// Wrap the SELECT in a span.select-wrapper
	select = this;
	select.className += " mob";
	select.className = select.className.trim();

	wrapper = document.createElement('div');
	captionText = '<span class="select-caption"></span><span class="select-arrow"></span>';
	wrapper.className='select-wrapper';
	wrapper.innerHTML = captionText;
	caption = wrapper.querySelector('.select-caption');
	select.parentNode.insertBefore(wrapper,select);
	wrapper.insertBefore(select,caption);

	select = wrapper.querySelector('select');

	// update Caption Now
	updateCaption();

	// Add listener
	select.addEventListener('change',updateCaption);

	// Notify object that it's already been MOBbed.
	this.MOB = true;
}






document.addEventListener ('init', function() {
	var allSelects = document.querySelectorAll('select');
	for (var i=0,len=allSelects.length;i<len;i++) {
		allSelects[i].MOBselect();
	}
})