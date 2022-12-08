from django.shortcuts import render
from .models import InventoryVO, SalesPerson, SalesRecord, Customer
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json

class InventoryEncoder(ModelEncoder):
    model = InventoryVO
    properties = ["import_href", "color","year", "vin"]

class SalesPersonListEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name", "employee_id"]

class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name","employee_id"]

    # def get_extra_data(self, o):
    #     return {
    #         "customer":o.sales.customer,
    #         "vin": o.sales.inventory.vin,
    #         "price": o.sales.price
    #         }

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number"]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties =["inventory", "sales_person", "customer","price"]

@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = SalesPerson.objects.all()
        print(salesperson)
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalesPersonListEncoder,
        )
    else:
        print("POST salesperson triggered")

        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        print(salesperson)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonListEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        print(customer)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder,
        )
    else:
        print("POST customer triggered")

        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def api_list_sales_record(request, inventory_vo_id=None):
    if request.method == "GET":
        if inventory_vo_id is not None:
            salesrecord = SalesRecord.objects.filter(inventory=inventory_vo_id)
        else:
            salesrecord = SalesRecord.objects.all()
        # print(salesrecord)
        return JsonResponse(
            {"salesrecord": salesrecord},
            encoder=SalesRecordEncoder,
        )
    else:
        print("POST sales record triggered")

        content = json.loads(request.body)
        # print(f"2{content}")
        try:
            inventory_href = content["inventory"]
            # print("IIIIII")
            inventories = InventoryVO.objects.get(import_href=inventory_href)
            # print(bins)
            content["inventory"]= inventories
            # print(bin_href, bins)
        except InventoryVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid inventory id"},
                status=400,
            )
        salesrecord = SalesRecord.objects.create(**content)
        print(salesrecord)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordEncoder,
            safe=False,
        )
