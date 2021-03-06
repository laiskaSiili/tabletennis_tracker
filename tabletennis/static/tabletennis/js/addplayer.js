'use strict';


// detect changes on add player input
var nameInput = document.getElementById('name-input');
var addPlayerButton = document.getElementById('add-player-button');

nameInput.addEventListener('input', onInputCheckNameAvailability);


// When page is loaded and when modal is closed, reset modal content
$(document).ready(resetAddPlayerModalContent);
$('body').on('hidden.bs.modal', '#addPlayerModal', resetAddPlayerModalContent);

function resetAddPlayerModalContent() {
    $("#addPlayerForm")[0].reset();
    $('#name-input-message-container').empty();
    addPlayerButton.disabled = false;
}


/**
 * Send a POST request to django to create a new player.
 *   Request:
 *   {
 *       'name': str -> The current value of the name input and the name of the player to be created.
 *   }
 *
 *   Expected response:
 *   {
 *       'name': str -> The name attribute from the request data,
 *       'message': {
 *          'messageType': str {'SUCCESS', 'ERROR', 'HIDDEN'}, -> status used to render corresponding HTML element.
 *          'content': str -> Message to be displayed by HTML element.
 *      }
 *   }
 */
$("#addPlayerForm").submit(addPlayer);

function addPlayer(e) {
    e.preventDefault();
    var serializedData = $(this).serialize();
    $.ajax({
        type : 'POST',
        url :  addPlayerUrl, // defined in landigpage.html by django template engine
        data : serializedData,
        dataType: 'json',
        success : onSuccessAddAndCheckPlayer,
        error : function(response){console.log(`ERROR: ${response}`)}
    });
}


/**
 * Send a GET request to django, asking whether a player with name of current value exists.
 *   Request:
 *   {
 *       'name': str -> The current value of the name input.
 *   }
 *
 *   Expected response:
 *   {
 *       'name': str -> The name attribute from the request data,
 *       'message': {
 *          'messageType': str {'SUCCESS', 'ERROR', 'HIDDEN'}, -> status used to render corresponding HTML element.
 *          'content': str -> Message to be displayed by HTML element.
 *      }
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
        success: onSuccessAddAndCheckPlayer,
        error: function() {console.log('ERROR')},
    });
}

/**
 * Called upon successful ajax response from onInputCheckNameAvailability() and addPlayer().
 * Display message based on a messageType: HIDDEN->no message, SUCCESS->green content, ERROR->red content.
 * @param {*} responseData The response JSON in the form of :
 *   {
 *       'name': str -> The name attribute from the request data,
 *       'message': {
 *          'messageType': str {'SUCCESS', 'ERROR', 'HIDDEN'}, -> status used to render corresponding HTML element.
 *          'content': str -> Message to be displayed by HTML element.
 *      }
 *   }
 */
function onSuccessAddAndCheckPlayer(responseData) {

    // Bail out if name input has already changed in the time it took the response to arrive.
    if (nameInput.value !== responseData.name) {
		return;
	}

    let messageType = responseData.message.messageType;
    let content = responseData.message.content;

    if (messageType === 'ERROR') {
        showMessage('#name-input-message-container', content, 'text-danger');
        addPlayerButton.disabled = true;
    } else if (messageType === 'NOERROR') {
        showMessage('#name-input-message-container', content, 'text-success');
        addPlayerButton.disabled = false;
    } else if (messageType === 'PLAYERADDED') {
        showMessage('#name-input-message-container', content, 'text-success');
        addPlayerButton.disabled = false;
        nameInput.value = '';
    }

}
