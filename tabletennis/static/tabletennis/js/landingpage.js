'use strict';


// detect changes on add player input
var nameInput = document.getElementById('name-input');
var nameMessageLabel = document.getElementById('name-message-label');
var addPlayerButton = document.getElementById('add-player-button');

nameInput.addEventListener('input', onInputCheckNameAvailability);
addPlayerButton.addEventListener('click', onClickAddPlayer);

function onClickAddPlayer(e) {

    $.ajax({
        method: 'POST',
        url: addPlayerUrl, // defined in landigpage.html by django template engine
        dataType: 'json',
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
        data: {
            'name': nameInput.value
        },
        success: onSuccessOnClickAddPlayer,
        error: function() {console.log('ERROR')},
    });
}

function onSuccessOnClickAddPlayer(data) {
    updateAndShowMessageLabel(data);
    nameInput.value = '';
}

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
        url: addPlayerUrl, // defined in landigpage.html by django template engine
        dataType: 'json',
        data: {
            'name': nameInput.value
        },
        success: onSuccessOnInputCheckNameAvailability,
        error: function() {console.log('ERROR')},
    });

}

function onSuccessOnInputCheckNameAvailability(data) {

	if (nameInput.value !== data.name) {
		return;
	}

	updateAndShowMessageLabel(data);
}


function updateAndShowMessageLabel(data) {


    if (data.message.messageType === 'ERROR') {
        nameMessageLabel.classList.remove('text-success')
        nameMessageLabel.classList.add('text-danger')
        addPlayerButton.disabled = true;
    } else {
        nameMessageLabel.classList.remove('text-danger')
        nameMessageLabel.classList.add('text-success')
        addPlayerButton.disabled = false;
    }
    
    nameMessageLabel.textContent = data.message.content;

    if (nameMessageLabel.textContent === 'NOMESSAGE') {
        nameMessageLabel.style.opacity = 0;
    }
    else {
        nameMessageLabel.style.opacity = 1;
    }

}
