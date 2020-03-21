from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse

from tabletennis.forms import AddPlayerForm
from tabletennis.models import Player

class LandingPageView(View):
    def get(self, request):
        ctx = {}
        return render(request, 'tabletennis/landingpage.html', ctx)

class ApiNameAvailability(View):
    def get(self, request):

        add_player_form = AddPlayerForm(request.GET)
        add_player_form.is_valid()
        errors = add_player_form.errors.get('name', '')

        return JsonResponse({
            'name': request.GET.get('name', ''),
            'errors': add_player_form.errors.get('name', [])
        })
