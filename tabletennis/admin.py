from django.contrib import admin
from tabletennis.models import Player

@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    pass