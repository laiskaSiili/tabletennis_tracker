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
        """
        1) Call clean super (which also calls model clean)
            - Model validation: Winner score >= 11.
            - Model validaton: Loser score >= 0.
            - Model validation: self.winner_score >= self.loser_score + 2
            - Model validation: self.winner_score > 11 and self.winner_score == self.loser_score + 2
        2) Make sure both player names exist as player objects.
        """
        # 1) Call clean super
        cleaned_data = super().clean()

        # 2) Make sure both player names exist as Player objects
        if not Player.objects.filter(name=cleaned_data.get('winner')).exists():
            raise forms.ValidationError(f'Invalid playername: {data.get("winner")}')
        if not Player.objects.filter(name=cleaned_data.get('loser')).exists():
            raise forms.ValidationError(f'Invalid playername: {data.get("loser")}')