# Generated by Django 3.1.4 on 2021-10-08 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0002_auto_20211008_1059'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='latitude',
            new_name='lat',
        ),
        migrations.RenameField(
            model_name='location',
            old_name='longitude',
            new_name='lon',
        ),
    ]
