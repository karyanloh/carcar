from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique = True)

    # def __str__(self):
    #     return self.vin


class Technician(models.Model):
    emp_name = models.CharField(max_length=100)
    emp_number = models.PositiveBigIntegerField(unique=True)

    # def __str__ (self):
    #     return self.emp_name

    def get_api_url(self):
        return reverse("api_techs", kwargs={'pk': self.pk})

# class ApptStatus(models.Model):
#     status = models.CharField(max_length = 200, null=False)

#     def __str__(self):
#         return self.status


class Appointment(models.Model):
    vin = models.CharField(max_length=17, null=True)

    # models.ForeignKey(
        # AutomobileVO,
        # related_name = "appointment",
        # on_delete=models.PROTECT,
        # null=True,
        # blank=True,
    # )
    # vip = something with booleanvip
    cust_name = models.CharField(max_length=200)
    appt_date = models.DateField(default = ['%Y-%m-%d'])
    appt_time = models.TimeField(default = ['%H:%M'])
    appt_reason = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    appt_reason = models.CharField(max_length=500)
    vip = models.BooleanField(default=False)
    # completed = models.BooleanField(default=False)
    status = models.CharField(max_length = 50, default = "scheduled")
    # status = models.ForeignKey(
    #     ApptStatus,
    #     related_name = "appointment",
    #     on_delete=models.PROTECT,
    #     null=True,
    #     blank=True,
    # )
    # def __str__ (self):
    #     return self.vin

    def get_api_url(self):
        return reverse("api_list_appts", kwargs = {'pk': self.pk})
