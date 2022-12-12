# Generated by Django 4.0.3 on 2022-12-09 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0008_alter_appointment_vin'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='vip',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='appt_date',
            field=models.DateTimeField(default=['%Y-%m-%d %H:%M']),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='appt_time',
            field=models.TimeField(default=['%H:%M']),
        ),
    ]