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
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
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
$('#add-game-button').on('click', addGame);

function addGame() {
    $.ajax({
        method: 'POST',
        url: addGameUrl, // defined in landigpage.html by django template engine
        dataType: 'json',
        headers: {
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        },
        data: {
            'winner': $('#addgame_winner').val(),
            'winner_score': $('#addgame_winner_score').val(),
            'loser': $('#addgame_loser').val(),
            'loser_score': $('#addgame_loser_score').val(),
        },
        success: onSuccessAddGame,
        error: function() {console.log('ERROR')},
    });
}

function onSuccessAddGame(responseData) {
    console.log(responseData);
}