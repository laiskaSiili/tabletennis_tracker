from django.db.models.functions import Lower
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View

from tabletennis.forms import AddPlayerForm, AddGameForm
from tabletennis.models import Player

class LandingPageView(View):
    def get(self, request):
        ctx = {}
        return render(request, 'tabletennis/landingpage.html', ctx)

class AddPlayerView(View):
    def get(self, request):
        add_player_form = AddPlayerForm(request.GET)
        messageType = 'NOERROR' if add_player_form.is_valid() else 'ERROR'
        content = add_player_form.errors.get('name', ['This name is available!'])[0]

        return JsonResponse({
            'name': request.GET.get('name', ''),
            'message': {
                'messageType': messageType,
                'content': content,
            }
        })

    def post(self, request):
        add_player_form = AddPlayerForm(request.POST)
        if add_player_form.is_valid():
            # Only true, if input length < 20, not empty and name not already taken (case insensitive).
            # All defined nicely DRY on Player model.
            add_player_form.save()
            messageType = 'PLAYERADDED'
            content = f'Player with name {add_player_form.cleaned_data.get("name")} was added.'
        else:
            messageType = 'ERROR'
            content = add_player_form.errors.get('name', [''])[0]

        return JsonResponse({
            'name': request.POST.get('name', ''),
            'message': {
                'messageType': messageType,
                'content': content,
            }
        })


class AddGameView(View):
    def get(self, request):
        # What to put here?...
        name = request.GET.get('name', '')
        cleaned_name = name.strip().lower()
        
        autocomplete_choices = [] if not name else list(Player.objects.filter(name__istartswith=cleaned_name).order_by(Lower('name')).values_list('name', flat=True))

        # Pass over only the top 3
        autocomplete_choices = autocomplete_choices[:3]

        return JsonResponse({
            'name': name,
            'autocomplete_choices': autocomplete_choices,
        })

    def post(self, request):
        add_game_form = AddGameForm(request.POST)
        if add_game_form.is_valid():
            field_errors = []
            non_field_errors = []
            first_form_error = ''
        else:
            field_errors = list(add_game_form.errors.values())
            non_field_errors = add_game_form.non_field_errors()
            first_form_error = (field_errors + non_field_errors)[0]
        return JsonResponse({
            'all_errors': (field_errors + non_field_errors),
            'first_error': first_form_error,
            'winner': add_game_form.cleaned_data.get('winner'),
        })
