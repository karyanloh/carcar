from django.urls import path
from .views import api_list_salesperson, api_list_customers, api_list_sales_record, api_show_customer, api_show_salesperson, api_show_sales_record

urlpatterns = [
    path("salesperson/", api_list_salesperson, name="api_create_salesperson"),
    path("salesperson/<int:pk>/", api_show_salesperson, name="api_show_salesperson"),
    path("customer/", api_list_customers, name="api_create_customer"),
    path("customer/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("sales/", api_list_sales_record, name="api_create_sales_record"),
    path("sales/<int:pk>", api_show_sales_record, name="api_show_sales_record"),
]
