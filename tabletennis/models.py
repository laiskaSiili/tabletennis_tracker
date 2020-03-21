from django.db import models


class PlayerManager(models.Manager):
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
