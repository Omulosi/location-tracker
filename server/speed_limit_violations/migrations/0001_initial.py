# Generated by Django 3.2.8 on 2021-10-26 11:46

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('drivers', '0001_initial'),
        ('speed_limit', '0003_alter_speedlimit_geom'),
        ('vehicles', '0004_auto_20211021_1400'),
        ('tracker_devices', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpeedViolation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('speed', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True)),
                ('date', models.DateTimeField(default=django.utils.timezone.now)),
                ('driver', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='drivers.driver')),
                ('speed_limit_section', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='speed_limit.speedlimit')),
                ('tracker', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tracker_devices.tracker')),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='vehicles.vehicle')),
            ],
        ),
    ]
