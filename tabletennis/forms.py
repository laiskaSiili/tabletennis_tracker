from django import forms

from tabletennis.models import Player

class AddPlayerForm(forms.ModelForm):

    class Meta:
        model = Player
        fields = ['name']