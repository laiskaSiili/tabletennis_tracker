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

        error_messages = {
            'winner': {
                'invalid_choice': 'Invalid winner name.',
                'required': 'Player names are required.'
            },
            'loser': {
                'invalid_choice': 'Invalid loser name.',
                'required': 'Player names are required.'
            },
            'winner_score': {
                'invalid': 'Winner score must be a whole number.',
                'required': 'Scores are required.'
            },
            'loser_score': {
                'invalid': 'Loser score must be a whole number.',
                'required': 'Scores are required.'
            }
        }

    def __init__(self, data, **kwargs):
        data = data.copy()
        winner = data.get('winner')
        if winner and Player.objects.filter(name=winner).exists():
            data['winner'] = Player.objects.get(name=winner)
        loser = data.get('loser')
        if loser and Player.objects.filter(name=loser).exists():
            data['loser'] = Player.objects.get(name=loser)

        super().__init__(data, **kwargs)

