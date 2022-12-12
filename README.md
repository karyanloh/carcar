# CarCar

Team: 15

* Lauren - Service
* Stephanie - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.
### Technicians
List technician
Method: GET
URL:

Show technician by id
Method: GET
URL:

Create technician
Method: POST
URL:
To create a technician use this JSON body format:


Expected result should look like this:


### Appointments
List Appointments
Method: GET
URL:

Show appointments by id
Method: GET
URL:

Create Appointment
Method: POST
URL:

To create an appointment use this JSON body format:

Expected result should look like this:



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
### Salesperson
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
{
	"name":"John",
	"employee_number":"E007"
}
Expected result should look like this:
{
	"href": "/api/salesperson/3/",
	"name": "John",
	"employee_number": "E007",
	"id": 3
}

### Customer
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
{
	"name": "Customer 1",
	"address": "123 Main St, Lakewood, WA 98405",
	"phone_number": 1234561234
}
Expected result should look like this:
{
	"name": "Customer 1",
	"address": "123 Main St, Lakewood, WA 98405",
	"phone_number": 1234561234
}

### Sales Record
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
{
    "inventory":"/api/automobiles/vin/", <--- replace vin with the vin of the vehicle
	"sales_person": "E001", <--- enter employee number here
	"customer": 2 , <--- enter customer id here
	"price": 10000 <--- enter the sale price of the vehicle
}

Expected result should look like this:
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
