from django.db import models


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

    def __str__(self):
        return self.name
