from django.urls import path
from .views import api_techs, api_list_appt, api_show_appt

urlpatterns = [
    path("tech/",api_techs, name="api_techs"),
    path("services/", api_list_appt, name="api_list_appt"),
    path("services/<int:pk>", api_show_appt,name="api_show_appt"),
]
