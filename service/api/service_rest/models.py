from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique = True)
    # color = models.CharField(max_length = 50)
    # year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    # model #this comes from FK, figure it out if you end up needing it

class Technician(models.Model):
    emp_name = models.CharField(max_length=100)
    emp_number = models.PositiveBigIntegerField(unique = True)

    def __str__ (self):
        return self.emp_name

    def get_api_url(self):
        return reverse("api_techs", kwargs={'pk: self.id'}) #double check api_list_techs; should match view name?

class Appointment(models.Model):
    model = models.ForeignKey(
        AutomobileVO,
        related_name = "appointment",
        on_delete=models.PROTECT,
    )
    cust_name = models.CharField(max_length=200)
    appt_date = models.DateTimeField(auto_now=False)
    # appt_reason = models.Charfield(max_length=200)

    model = models.ForeignKey(
        Technician,
        related_name = "appointment",
        on_delete=models.PROTECT,
    )
    appt_reason = models.CharField(max_length=500)

    def __str__ (self):
        return self.appt_date

    def get_api_url(self):
        return reverse("api_list_appts", kwargs = {'pk: self.id'})



#meta class for ordering purposes?

#IF THERE'S TIME, look more into limit_choices_to for tech FK option; MODEL UPDATES REQUIRED - you also may be tired and thinking about this the wrong way, revisit when more awake - is_staff: yes required in tech model if not too tired
