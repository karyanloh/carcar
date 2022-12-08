from django.db import models

# Create your models here.
class InventoryVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.IntegerField()

class SalesRecord(models.Model):
    inventory = models.ForeignKey(
        InventoryVO,
        related_name="salesrecords",
        on_delete=models.CASCADE
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="salesrecords",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="salesrecords",
        on_delete=models.CASCADE
    )
    price = models.PositiveSmallIntegerField()
