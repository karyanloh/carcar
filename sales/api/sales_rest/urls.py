from django.urls import path
from .views import api_list_salesperson, api_list_customers, api_list_sales_record

urlpatterns = [
    path("salesperson/", api_list_salesperson, name="api_create_salesperson"),
    path("customer/", api_list_customers, name="api_create_customer"),
    path("sales/", api_list_sales_record, name="api_create_sales_record"),
]
