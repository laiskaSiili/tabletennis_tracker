'use strict';


// detect changes on add player input
var nameInput = document.getElementById('name-input');
var nameErrorLabel = document.getElementById('name-error-label');
var addPlayerButton = document.getElementById('add-player-button');

nameInput.addEventListener('input', onInputCheckNameAvailability);

/**
 * onInputCheckNameAvailability
 * Send a GET request to django, asking whether a player with name of current value exists.
 *   We want to receive a JSON response of the form.
 *   Request:
 *   {
 *       'name': str -> The current value of the name input.
 *   }
 *
 *   Expected response:
 *   {
 *       'name': str -> The name attribute from the request data,
 *       'errors': list -> list of errors, empty list if none
 *   }
 */
function onInputCheckNameAvailability(e) {

    $.ajax({
        method: 'GET',
        url: apiNameAvailabilityUrl, // defined in landigpage.html by django template engine
        dataType: 'json',
        data: {
            'name': nameInput.value
        },
        success: onSuccessOnInputCheckNameAvailability,
        error: function() {console.log('ERROR')},
    });

}

function onSuccessOnInputCheckNameAvailability(data) {

    console.log(data)
	if (nameInput.value !== data.name) {
		return;
	}

	if (data.errors.length > 0) {
        nameErrorLabel.textContent = data.errors[0];
        nameErrorLabel.style.opacity = 1;
        addPlayerButton.disabled = true;
	} else {
        nameErrorLabel.style.opacity = 0;
        addPlayerButton.disabled = false;
	}
}