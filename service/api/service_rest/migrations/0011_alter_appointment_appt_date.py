# Generated by Django 4.0.3 on 2022-12-09 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0010_alter_appointment_appt_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='appt_date',
            field=models.DateField(default=['%Y-%m-%d']),
        ),
    ]
