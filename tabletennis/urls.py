from django.urls import path
from tabletennis.views import LandingPageView, AddPlayerView

urlpatterns = [
    path('', LandingPageView.as_view(), name='landing_page'),
    path('api/v0/add_player', AddPlayerView.as_view(), name='add_player_view'),
]