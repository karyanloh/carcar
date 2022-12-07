from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, Appointment

# Create your views here.


@require_http_methods(["GET", "POST"])
def api_techs(request, automobile_vo_id = None):
    if request.method == "GET":
        if automobile_vo_id is not None;
        technician

api_list_appts
