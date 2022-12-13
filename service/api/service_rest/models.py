from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique = True)


class Technician(models.Model):
    emp_name = models.CharField(max_length=100)
    emp_number = models.PositiveBigIntegerField(unique=True)


    def get_api_url(self):
        return reverse("api_techs", kwargs={'pk': self.pk})



class Appointment(models.Model):
    vin = models.CharField(max_length=17, null=True)
    cust_name = models.CharField(max_length=200)
    appt_date = models.DateTimeField(default = ['%Y-%m-%d %H:%M'])
    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    appt_reason = models.CharField(max_length=500)
    vip = models.BooleanField(default=False)
    status = models.CharField(max_length = 50, default = "scheduled")


    def get_api_url(self):
        return reverse("api_list_appts", kwargs = {'pk': self.pk})
