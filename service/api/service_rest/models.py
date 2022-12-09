from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique = True)
    # color = models.CharField(max_length = 50)
    # year = models.PositiveSmallIntegerField()
    # vin = models.CharField(max_length=17, unique=True)
    # model #this comes from FK, figure it out if you end up needing it

    def __str__(self):
        return self.vin


class Technician(models.Model):
    emp_name = models.CharField(max_length=100)
    emp_number = models.PositiveBigIntegerField(unique = True)

    def __str__ (self):
        return self.emp_name

    def get_api_url(self):
        return reverse("api_techs", kwargs={'pk': self.id}) #double check api_list_techs; should match view name?

class ApptStatus(models.Model):
    status = models.CharField(max_length = 200, null=False)

    def __str__(self):
        return self.status


class Appointment(models.Model):
    vin = models.ForeignKey(
        AutomobileVO,
        related_name = "appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    # vip = something with boolean
    cust_name = models.CharField(max_length=200)
    appt_date = models.DateTimeField()
    appt_time = models.TimeField()
    appt_reason = models.CharField(max_length=200)

    technician = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    appt_reason = models.CharField(max_length=500)
    status = models.ForeignKey(
        ApptStatus,
        related_name = "appointment",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    # def __str__ (self):
    #     return self.appt_date

    def get_api_url(self):
        return reverse("api_list_appts", kwargs = {'pk': self.id})

# class ApptStatus(models.Model):
#     status = models.Charfield(max_length = 200)

#     def __str__(self):
#         return self.status
