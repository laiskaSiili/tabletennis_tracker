from django.urls import path
from tabletennis.views import LandingPageView

urlpatterns = [
    path('', LandingPageView.as_view(), name='landing_page'),
]