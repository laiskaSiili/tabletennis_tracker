from django import forms

from tabletennis.models import Player, Game

class AddPlayerForm(forms.ModelForm):

    class Meta:
        model = Player
        fields = ['name']


class AddGameForm(forms.ModelForm):

    class Meta:
        model = Game
        fields = ['winner', 'loser', 'winner_score', 'loser_score']

    def clean_winner(self):
        winner = self.cleaned_data.get('winner')
        if not Player.objects.filter(name=winner).exists():
            raise forms.ValidationError(f'Invalid winner name: {winner}')
        return Player.objects.get(name=winner)

    def clean_loser(self):
        loser = self.cleaned_data.get('loser')
        if not Player.objects.filter(name=loser).exists():
            raise forms.ValidationError(f'Invalid loser name: {loser}')
        return Player.objects.get(name=loser)
