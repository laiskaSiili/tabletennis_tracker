from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False, help_text='Player name')
    score = models.IntegerField(default=0, blank=False, null=False, help_text='Player score')

    def __str__(self):
        return self.name
