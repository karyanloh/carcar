import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import InventoryVO

def get_inventory():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    # print(content)
    for auto in content["autos"]:
        InventoryVO.objects.update_or_create(
            import_href=auto["href"],
            defaults={
                "color": auto["color"],
                "year": auto["year"],
                "vin": auto["vin"],
            }
        )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
           get_inventory()

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
