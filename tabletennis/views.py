from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse

from tabletennis.forms import AddPlayerForm
from tabletennis.models import Player

class LandingPageView(View):
    def get(self, request):
        ctx = {}
        return render(request, 'tabletennis/landingpage.html', ctx)

class AddPlayerView(View):
    def get(self, request):
        add_player_form = AddPlayerForm(request.GET)
        messageType = 'HIDDEN' if add_player_form.is_valid() else 'ERROR'
        content = add_player_form.errors.get('name', [''])[0]

        return JsonResponse({
            'name': request.GET.get('name', ''),
            'message': {
                'messageType': messageType,
                'content': content
            }
        })

    def post(self, request):
        add_player_form = AddPlayerForm(request.POST)
        if add_player_form.is_valid():
            # Only true, if input length < 20, not empty and name not already taken (case insensitive).
            # All defined nicely DRY on Player model.
            add_player_form.save()
            messageType = 'SUCCESS'
            content = f'Player with name {add_player_form.cleaned_data.get("name")} was added.'
        else:
            messageType = 'ERROR'
            content = add_player_form.errors.get('name', [''])[0]

        return JsonResponse({
            'name': request.POST.get('name', ''),
            'message': {
                'messageType': messageType,
                'content': content
            }
        })