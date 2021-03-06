# Generated by Django 3.0.4 on 2020-04-03 07:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tabletennis', '0003_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='loser_score',
            field=models.IntegerField(help_text='Score of the losing player', validators=[django.core.validators.MinValueValidator(0)]),
        ),
        migrations.AlterField(
            model_name='game',
            name='winner_score',
            field=models.IntegerField(help_text='Score of the winning player', validators=[django.core.validators.MinValueValidator(11)]),
        ),
    ]
