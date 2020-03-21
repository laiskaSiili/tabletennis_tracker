# Generated by Django 3.0.4 on 2020-03-21 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Player name', max_length=20)),
                ('score', models.IntegerField(default=0, help_text='Player score')),
            ],
        ),
    ]