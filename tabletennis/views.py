from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

class HomeView(View):
    def get(self, request):
        return HttpResponse('<h1>It works!</h1>')
