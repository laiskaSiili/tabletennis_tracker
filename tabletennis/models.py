from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator

class PlayerManager(models.Manager):
    """
    Custom manager for Player model to make name lookup case insensitive
    by replacing the name lookup argument in get() and filter() with name__iexact.
    A little hacky, but it works and allows the modelform validation to detect name collisions
    independent of case.
    """
    def filter(self, **kwargs):
        if 'name' in kwargs:
            kwargs['name__iexact'] = kwargs['name']
            del kwargs['name']
        return super(PlayerManager, self).filter(**kwargs)

    def get(self, **kwargs):
        if 'name' in kwargs:
            kwargs['name__iexact'] = kwargs['name']
            del kwargs['name']
        return super(PlayerManager, self).get(**kwargs)


class Player(models.Model):
    name = models.CharField(unique=True, max_length=20, blank=False, null=False, help_text='Player name')
    score = models.IntegerField(default=0, blank=False, null=False, help_text='Player score')

    objects = PlayerManager()

    def clean(self):
        super().clean()
        if self.name.lower().startswith('no matches'):
            raise ValidationError({'name': 'Haha, you funny bunny!'})

    def __str__(self):
        return self.name


class Game(models.Model):
    winner = models.ForeignKey(Player, related_name='games_won', on_delete=models.SET_NULL, blank=False, null=True, help_text='Winning player')
    loser = models.ForeignKey(Player, related_name='games_lost', on_delete=models.SET_NULL, blank=False, null=True, help_text='Losing player')
    winner_score = models.IntegerField(blank=False, null=False, help_text='Score of the winning player')
    loser_score = models.IntegerField(blank=False, null=False, help_text='Score of the losing player')
    timestamp = models.DateTimeField(auto_now_add=True)

    def clean(self):
        super().clean()
        if self.winner_score and self.winner_score < 11:
            raise ValidationError('Winner score must not be lower than 11 points.')
        elif self.loser_score and self.loser_score < 0:
            raise ValidationError('Loser score must not be lower than 0 points.')
        elif self.winner_score and self.loser_score and self.winner_score < self.loser_score + 2:
            raise ValidationError('The winning player needs to have at least 2 more points than the losing player.')
        elif self.winner_score and self.loser_score and self.winner_score > 11 and self.winner_score != self.loser_score + 2:
            raise ValidationError('After a deuce, the winning player needs to have exactly 2 more points than the losing player.')
