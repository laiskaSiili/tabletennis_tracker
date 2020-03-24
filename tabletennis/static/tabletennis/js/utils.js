'use strict';

function showMessage(container, msg, cssClass) {
    container = $(container);
    // Hide and remove all previous messages.
    $(container).children().each(function() {
        $(this).fadeOut(150, function() { $(this).remove() });
    });
    // Create and fade in new message element.
    let element = `<span><small class="${cssClass} form-text">${msg}</small></span>`
    $(element).hide().appendTo(container).fadeIn(150);
}