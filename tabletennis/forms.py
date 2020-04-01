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

    def clean(self):
        cleaned_data = super().clean()

        # 0) UI does not distinguish between winner and loser. So compare scores here and swap if needed.
        if cleaned_data.get('winner_score'):
            pass

        # 1) Make sure both player names exist as Player objects
        if not Player.objects.filter(name=cleaned_data.get('winner')).exists():
            self.add_error('winner', 'Please enter an existing playername.')
        if not Player.objects.filter(name=cleaned_data.get('loser')).exists():
            self.add_error('loser', 'Please enter an existing playername.')
        
        # 2) Allow no negative score
        # --> This is handled on the Game model fields using validators.

        # 3) If one score is exactly 11 or 21, check that other 