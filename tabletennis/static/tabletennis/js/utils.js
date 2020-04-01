'use strict';

function showMessage(container, msg, cssClass, fadeOutTime=150, fadeInTime=150) {
    container = $(container);
    // Hide and remove all previous messages.
    $(container).children().each(function() {
        $(this).fadeOut(fadeOutTime, function() { $(this).remove(); });
    });
    // Create and fade in new message element.
    let element = `<span><small class="${cssClass} form-text">${msg}</small></span>`
    $(element).hide().appendTo(container).fadeIn(fadeInTime);
}