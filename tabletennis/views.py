from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse

from tabletennis.models import Player

class LandingPageView(View):
    def get(self, request):
        ctx = {}
        return render(request, 'tabletennis/landingpage.html', ctx)

class ApiNameAvailability(View):
    def get(self, request):

        name = request.GET.get('name')
        name = name.strip().lower()

        exists = 1 if Player.objects.filter(name__iexact=name).exists() else 0

        return JsonResponse({
            'name': name,
            'exists': exists
        })
