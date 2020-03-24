'use strict';


// detect changes on add player input
$('.autocomplete-container input').on('input', onInputCheckAutoComplete);

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
            onInputDisplayAutoComplete(responseData, targetInput);
        },
        error: function() {console.log('ERROR')},
    });
}

function onInputDisplayAutoComplete(responseData, targetInput) {

        // Bail out if name input has already changed in the time it took the response to arrive.
        if (targetInput.value !== responseData.name) {
            return;
        }
    
        // Add logic to add p elements here
        var dropdown = $(targetInput).parent().find('.autocomplete-dropdown-inner');
        dropdown.empty();

        if (responseData.autocomplete_choices.length == 0) {
            dropdown.fadeTo(0);
        } else {
            dropdown.fadeTo(1);
        }

        for (var choice of responseData.autocomplete_choices) {
            $(`<p class="m-0">${choice}</p>`).appendTo(dropdown);
        }
}