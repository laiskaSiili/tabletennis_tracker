from django.urls import path
from tabletennis.views import HomeView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
]