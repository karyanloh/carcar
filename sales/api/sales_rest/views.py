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
    properties = ["name", "employee_number", "id"]

class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = ["name","employee_number","id"]

    # def get_extra_data(self, o):
    #     return {
    #         "customer":o.sales.customer,
    #         "vin": o.sales.inventory.vin,
    #         "price": o.sales.price
    #         }

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["id","name", "address", "phone_number"]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties =["inventory", "sales_person", "customer","price","id"]
    encoders ={
        "inventory":InventoryEncoder(),
        "sales_person":SalesPersonDetailEncoder(),
        "customer":CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salesperson(request):
    if request.method == "GET":
        salesperson = SalesPerson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalesPersonListEncoder,
        )
    else:
        print("POST salesperson triggered")

        content = json.loads(request.body)
        salesperson = SalesPerson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalesPersonListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_salesperson(request, pk):
    if request.method =="GET":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonDetailEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = SalesPerson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales person does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            salesperson = SalesPerson.objects.get(id=pk)

            props = ["name","employee_number"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonListEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code = 404
            return response


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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)

            props = ["name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response

@require_http_methods(["GET", "POST"])
def api_list_sales_record(request, inventory_vo_id=None):
    if request.method == "GET":
        if inventory_vo_id is not None:
            salesrecord = SalesRecord.objects.filter(inventory=inventory_vo_id)
        else:
            salesrecord = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecord": salesrecord},
            encoder=SalesRecordEncoder,
        )
    else:
        print("POST sales record triggered")

        content = json.loads(request.body)
        try:
            # match inventory
            inventory_href = content["inventory"]
            inventories = InventoryVO.objects.get(import_href=inventory_href)
            content["inventory"]= inventories
            # match salesperson
            employee_num = content["sales_person"]
            salesperson = SalesPerson.objects.get(employee_number=employee_num)
            content["sales_person"]= salesperson
            # match customer
            customer_id= content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"]= customer
        except (InventoryVO.DoesNotExist, SalesPerson.DoesNotExist, Customer.DoesNotExist):
            return JsonResponse(
                {"message": "Unable to create order due to information mismatch"},
                status=400,
            )
        salesrecord = SalesRecord.objects.create(**content)
        print(salesrecord)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_sales_record(request, pk):
    if request.method == "GET":
        try:
            salesrecord = SalesRecord.objects.get(id=pk)
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Sales record does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesrecord = SalesRecord.objects.get(id=pk)
            salesrecord.delete()
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            return JsonResponse({"message": "Sales record does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            salesrecord = SalesRecord.objects.get(id=pk)

            props = ["inventory", "sales_person", "customer", "price"]
            for prop in props:
                if prop in content:
                    setattr(salesrecord, prop, content[prop])
            salesrecord.save()
            return JsonResponse(
                salesrecord,
                encoder=SalesRecordEncoder,
                safe=False,
            )
        except SalesRecord.DoesNotExist:
            response = JsonResponse({"message": "Record does not exist"})
            response.status_code = 404
            return response
