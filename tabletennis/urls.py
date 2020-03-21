from django.urls import path
from tabletennis.views import LandingPageView, ApiNameAvailability

urlpatterns = [
    path('', LandingPageView.as_view(), name='landing_page'),
    path('api/v0/nameavailability', ApiNameAvailability.as_view(), name='api_name_availability'),
]