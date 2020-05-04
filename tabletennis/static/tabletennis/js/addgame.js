'use strict';

/*
    CHECK NAMES
*/

// detect changes on add player input
$('.autocomplete-container input').on('input', onInputCheckAutoComplete);
$('.autocomplete-container input').on('focusin', onAutocompleteFocusin);
$('.autocomplete-container input').on('focusout', onAutocompleteFocusout);

$('.autocomplete-dropdown-inner').on('click', 'p', onAutocompleteClick);

function onAutocompleteClick(e) {
    var clickedSuggestion = e.target;
    var autocompleteInput = $(clickedSuggestion).parents('.autocomplete-container').find('input');
    autocompleteInput.val(clickedSuggestion.textContent);
}

function onAutocompleteFocusin(e) {
    var autoCompleteContainer = $(e.target).parent();
    autoCompleteContainer.css('z-index', 3); // simulate bootstrap css when input has focus. Apply to container, because this holds input.
    autoCompleteContainer.find('.autocomplete-dropdown-inner').empty();
    autoCompleteContainer.find('.autocomplete-dropdown-inner').fadeIn(250);
}

function onAutocompleteFocusout(e) {
    var autoCompleteContainer = $(e.target).parent();
    autoCompleteContainer.find('.autocomplete-dropdown-inner').fadeOut(250, function() {
        autoCompleteContainer.css('z-index', 0); // simulate bootstrap css when input has focus. Apply to container, because this holds input.
    });
}

function onInputCheckAutoComplete(e) {
    var targetInput = e.target;
    $.ajax({
        method: 'GET',
        url: addGameUrl, // defined in landigpage.html by django template engine
        dataType: 'json',
        data: {
            'name': targetInput.value
        },
        success: function(responseData) {
            onSuccessOnInputCheckAutoComplete(responseData, targetInput);
        },
        error: function() {console.log('ERROR')},
    });
}

function onSuccessOnInputCheckAutoComplete(responseData, targetInput) {

        // Bail out if name input has already changed in the time it took the response to arrive.
        if (targetInput.value !== responseData.name) {
            return;
        }

        // Add logic to add p elements here
        var dropdown = $(targetInput).parent().find('.autocomplete-dropdown-inner');
        dropdown.empty();

        if (responseData.autocomplete_choices.length === 0) {
            $(`<p class="no-pointer m-0 px-3 py-1">No matches found...</p>`).appendTo(dropdown);
        } else {
            for (var choice of responseData.autocomplete_choices) {
                $(`<p class="m-0 px-3 py-1">${choice}</p>`).appendTo(dropdown);
            }
        }

}

/*
    SUBMIT GAME
*/
$("#addGameForm").submit(addGame);

function addGame(e) {
    e.preventDefault();
    var serializedData = $(this).serialize();
    $.ajax({
        type : 'POST',
        url :  addGameUrl, // defined in landigpage.html by django template engine
        data : serializedData,
        dataType: 'json',
        success : onSuccessAddGame,
        error : function(response){console.log(`ERROR: ${response}`)}
    });
}

function onSuccessAddGame(responseData) {

    let messageType = responseData.message.messageType;
    let content = responseData.message.content;

    if (messageType === 'ERROR') {
        showMessage('#add-game-message-container', content, 'text-danger');
    } else if (messageType === 'GAMEADDED') {
        $("#addGameForm")[0].reset();
        showMessage('#add-game-message-container', content, 'text-success');
    }
}