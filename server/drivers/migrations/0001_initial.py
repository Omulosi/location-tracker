# Generated by Django 3.1.4 on 2021-10-21 14:00

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(default='', max_length=100)),
                ('rfid', models.CharField(default='', max_length=100)),
                ('id_number', models.CharField(default='', max_length=100)),
            ],
        ),
    ]
