from django.urls import path
from tabletennis.views import LandingPageView, AddPlayerView, AddGameView

urlpatterns = [
    path('', LandingPageView.as_view(), name='landing_page'),
    path('api/add_player', AddPlayerView.as_view(), name='add_player_view'),
    path('api/add_game', AddGameView.as_view(), name='add_game_view'),
]