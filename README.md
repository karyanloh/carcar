# CarCar

Team: 15

* Lauren - Services
* Stephanie - Sales

## Design

## Service microservice
Services microservice

The models in the services microservice are the Technician model, the Appointment model, and the AutomobileVO model.  The Technician model establishes the required fields to create a technician, and the parameters for those fields.  The required fields are emp_name for the technician's name, and emp_number for the technician's unique employee number.  The Appointment model establishes the required fields to create a service appointment for a vehicle, and the parameters for those fields.  The required fields are vin for the vin of the vehicle, cust_name for the name of the customer who brought in the vehicle, appt_date for the date and time of the appointment, technician for the technician who will be providing the service, which is referenced via a ForeignKey to that links to the Technician model, appt_reason for the reason for the service appointment, vip which determines if the vehicle came from our inventory and receives special service and defaults to False unless the VIN is recognized as a match to one in the inventory microservice, and status which states the current status of the appointment and defaults to "scheduled" upon submission of a new appointment.  The AutomobileVO model establishes the automobile as a value object, along with the necessary parameters for integration with the inventory microservice.   The required fields are import_href for that specific automobile's unique id, and vin for the vin of the vehicle.  The vin field in this model is used as the reference point against the vins listed in the inventory microservice, to determine if the vehicle came from our inventory or not, which will then determine the vip status.

Automobile is a value object in the services microservice, because the automobile is an object in the inventory microservice, and in the services microservice it is linked back to the vins in the inventory microservice to determine if the vehicle came from our inventory or not, which will then determine vip status during service appointment scheduling


Sales microservice

The models are the SalesPerson model, the Customer model, the SalesRecord model, and the InventoryVO model.  The SalesPerson model establishes the required fields to create a salesperson, and the parameters for those fields.   The required fields are name for the salesperson’s name, and employee_number for their employee number.  The Customer model establishes the required fields to create a customer, and the parameters for those fields.   The required fields are name for the customer’s name, address for the customer’s address, and phone_number for the customer’s phone number.   The SalesRecord model establishes the required fields to create a sales record, and the parameters for those fields.  The required fields are inventory for the specific automobile from inventory being sold, which is referenced via a ForeignKey, sales_person for the salesperson who completed the sale, which is referenced via a ForeignKey, customer for the customer who purchased the automobile that was part of the sale, which is referenced via a ForeignKey, and price for the price of the automobile that was sold.   The InventoryVO model establishes an automobile as a value object, along with the necessary parameters for integration with the inventory microservice.  The required fields are the import_href for that specific automobile’s unique id, color for the color of the vehicle, year for the year the vehicle was made, and vin for the vin of the vehicle.  The vin field in this model is used as the reference point against the vins listed in the inventory microservice, to determine if the vehicle is currently in our inventory.

The automobile is a value object in the sales microservice (via the InventoryVO), because the automobile is an object in the inventory microservice, and in the sales microservice it is used to link back to the vins in the inventory microservice to determine if a vehicle is available for sale.


### How to Run the Application
Enter the following command to clone the repo into your directory: git clone https://gitlab.com/karyansloh/project-beta

To create the necessary Docker containers, open Docker desktop, and enter the following commands into your terminal:

docker volume create beta-data

docker-compose build

docker-compose up

To create and test the database prior to launching the app, complete the following:

In Insomnia, create a manufacturer folder.  In that folder, create the following requests:

Create manufacturer

Method: POST

URL: http://localhost:8100/api/manufacturers/

To create a manufacturer use this JSON body format:

```
{
  "name": "Chrysler"
}
```

Expected result should look like this:

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```


Update manufacturer

Method: PUT

URL: http://localhost:8100/api/manufacturers/:id/

:id should be the manufacturers' respective id in the database

To update a manufacturer use this JSON body format:

```
{
  "name": "Chrysler"
}
```

Expected result should look like this:

```
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

Show specific manufacturer by ID

Method: GET

URL: http://localhost:8100/api/manufacturers/:id/

:id should be the manufacturers' respective id in the database


Delete manufacturer

METHOD: DEL

URL: http://localhost:8100/api/manufacturers/:id/

:id should be the manufacturers' respective id in the database

List manufacturers:

METHOD: GET

URL: http://localhost:8100/api/manufacturers/



In Insomnia, create a vehicle models folder.  In that folder, create the following requests:

Create vehicle model

Method: POST

URL: http://localhost:8100/api/models/

To create a vehicle model use this JSON body format:

```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Expected result should look like this:

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Chrysler"
  }
}
```

Update vehicle model

Method: PUT

URL: http://localhost:8100/api/models/:id/

:id should be the vehicle models' respective id in the database

To update a vehicle model use this JSON body format:

```
{
  "name": "Toyota",
}
```

NOTE:  Sample data is using name as a field to update; name, picture_url, or name and picture_url are all acceptable configurations for data that can be updated via this method.

Expected result should look like this:

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Toyota",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Chrysler"
  }
}
```

Show specific vehicle model by ID

Method: GET

URL: http://localhost:8100/api/models/:id/

:id should be the vehicle models' respective id in the database


Delete vehicle

METHOD: DEL

URL: http://localhost:8100/api/models/:id/

:id should be the vehicle models’ respective id in the database

List vehicle models:

METHOD: GET

URL: http://localhost:8100/api/models/


In Insomnia, create an automobiles folder.  In that folder, create the following requests:

Create automobile

Method: POST

URL: http://localhost:8100/api/automobiles/

To create an automobile use this JSON body format:

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

Expected result should look like this:

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Toyota",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Chrysler"
    }
  }
}
```




Update automobile

Method: PUT

URL: http://localhost:8100/api/automobiles/:vin/

:vin should be the automobiles unique vin number from the database

To update an automobile use this JSON body format:

```
{
  "color": "black",
  "year": 2012
}
```

NOTE:  Sample data is using color and year as fields to update; color, year, or color and year are all acceptable configurations for data that can be updated via this method.

Expected result should look like this:

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "black",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Toyota",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Chrysler"
    }
  }
}
```

Show specific automobile by ID

Method: GET

URL: http://localhost:8100/api/automobiles/:vin/

:vin should be the automobiles unique vin number from the database

Delete vehicle

METHOD: DEL

URL: http://localhost:8100/api/automobiles/:vin/

:vin should be the automobiles unique vin number from the database

List vehicle models:

METHOD: GET

URL: http://localhost:8100/api/automobiles/


Once this is completed, open the app by entering the following in your web browser: http://localhost:3000/


### Technicians

In Insomnia, create a technician folder.  In that folder, create the following requests:

Create technician

Method: POST

URL:http://localhost:8080/api/tech/

To create a technician use this JSON body format:

```
{
	"emp_name": "Carol",
	"emp_number": "23098"

}
```


Expected result should look like this:

```
{
	"id": 11,
	"emp_name": "Carol",
	"emp_number": "2795"
}
```

List technician

Method: GET

URL: http://localhost:8080/api/tech/



### Appointments

In Insomnia, create an appointments folder.  In that folder, create the following requests:

Create Appointment

Method: POST

URL: http://localhost:8080/api/services/

To create an appointment use this JSON body format:

```
{
	"vin": "715",
	"cust_name" : "Sally",
	"appt_date" : "2022-12-15 12:30",
	"technician" : 97,
	"appt_reason": "brakes",
	"status": "scheduled",
	"vip": "True"
}
```

Expected result should look like this:

```
{
	"id": 135,
	"vin": "715",
	"cust_name": "Sally",
	"appt_date": "2022-12-15 12:30",
	"technician": {
		"emp_name": "Saul",
		"emp_number": 97
	},
	"appt_reason": "brakes",
	"status": "scheduled",
	"vip": "True"
}
```

Update Appointments

Method: PUT

URL: http://localhost:8080/api/services/<pk:id>

pk:id should be the appointments' respective id in the database

To upodate an appointment use this JSON body format:

```
{
	"status": "cancelled"
}
```

Expected result should look like this:

```
{
	"id": 75,
	"vin": "3575747576",
	"cust_name": "John",
	"appt_date": "2022-12-15T00:00:00+00:00",
	"technician": {
		"id": 1,
		"emp_name": "Saul",
		"emp_number": 97
	},
	"appt_reason": "brakes",
	"status": "cancelled",
	"vip": false
}
```

List Appointments

Method: GET

URL: http://localhost:8080/api/services/

Show Specific Appointment by ID

Method: GET

URL: http://localhost:8080/api/services/<pk:id>

pk:id should be the appointments' respective id in the database

Delete Appointment

Method: DEL

URL: http://localhost:8080/api/services/<pk:id>

pk:id should be the appointments' respective id in the database




## Sales microservice

Explain your models and integration with the inventory
microservice, here.
### Salesperson

In Insomnia create a salesperson folder.  In that folder, create the following requests:

List salesperson

Method: GET

URL: http://localhost:8090/api/salesperson/

Show salesperson by id

Method: GET

URL: http://localhost:8090/api/salesperson/int:pk/

Create salesperson

Method: POST

URL: http://localhost:8090/api/salesperson/
To create a salesperson use this JSON body format:
```json
{
	"name":"John",
	"employee_number":"E007"
}
```
Expected result should look like this:
```json
{
	"href": "/api/salesperson/3/",
	"name": "John",
	"employee_number": "E007",
	"id": 3
}
```

### Customer

In Insomnia create a customer folder.  In that folder, create the following requests:

List Customers

Method: GET

URL: http://localhost:8090/api/customer/

Show customer by id

Method: GET

URL: http://localhost:8090/api/customer/int:pk/

Create Customer

Method: POST

URL: http://localhost:8090/api/customer/

To create a customer use this JSON body format:
```json
{
	"name": "Customer 1",
	"address": "123 Main St, Lakewood, WA 98405",
	"phone_number": 1234561234
}
```
Expected result should look like this:
```json
{
	"name": "Customer 1",
	"address": "123 Main St, Lakewood, WA 98405",
	"phone_number": 1234561234
}
```

### Sales Record

In Insomnia create a sales record folder.  In that folder, create the following requests:

List Sales Record

Method: GET

URL: http://localhost:8090/api/sales/

Show Sales Record by id

Method: GET

URL: http://localhost:8090/api/sales/int:pk/

Create Sales Record

Method: POST

URL: http://localhost:8090/api/sales/

To create a sales record used this JSON body format:
```json
{
    "inventory":"/api/automobiles/vin/", <--- replace vin with the vin of the vehicle
	"sales_person": "E001", <--- enter employee number here
	"customer": 2 , <--- enter customer id here
	"price": 10000 <--- enter the sale price of the vehicle
}
```

Expected result should look like this:
```json
{
	"inventory": {
		"import_href": "/api/automobiles/1234567890/",
		"color": "beige",
		"year": 2021,
		"vin": "1234567890"
	},
	"sales_person": {
		"href": "/api/salesperson/1/",
		"name": "Bill",
		"employee_number": "E001",
		"id": 1
	},
	"customer": {
		"href": "/api/customer/1/",
		"name": "Customer 1",
		"address": "123 Main St, Lakewood, WA 98405",
		"phone_number": 1234561234
	},
	"price": 10000
}
```
