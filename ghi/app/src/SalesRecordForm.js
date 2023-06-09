import React from "react";

class SalesRecordForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            automobile:"",
            automobiles: [],
            salesPerson: "",
            salesPersons:[],
            customer:"",
            customers: [],
            price:""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this)
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
        this.handleCustomerChange = this.handleCustomerChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
}
async componentDidMount(){
    const salespersonUrl = "http://localhost:8090/api/salesperson/"
    const salespersonRes = await fetch(salespersonUrl)
    if(salespersonRes.ok){
        const salespersonData = await salespersonRes.json()
        this.setState({salesPersons: salespersonData.salesperson})
    }

    const customerUrl = "http://localhost:8090/api/customer/"
    const customerRes = await fetch(customerUrl)
    if(customerRes.ok){
        const customerData = await customerRes.json()
        this.setState({customers: customerData.customer})
    }
    const url = "http://localhost:8090/api/sales/"
    const salesRes = await fetch(url)
    if(salesRes.ok){
        const salesData = await salesRes.json()
        const salesRecord = salesData.salesrecord
        const soldVehicles = []
        salesRecord.map(sales=> {soldVehicles.push(sales.inventory)})
        const vehicleUrl = "http://localhost:8100/api/automobiles/"
        const vehicleRes = await fetch(vehicleUrl)
        if(vehicleRes.ok){
            const vehicleData = await vehicleRes.json()
            const vehicles = vehicleData.autos
            const availableVehicles = vehicles.filter(vehicle=> !soldVehicles.vin)
            this.setState({automobiles:availableVehicles})
        }
    }
  }
async handleSubmit(event){
    event.preventDefault();
    const data = {...this.state}
    data.sales_person = data.salesPerson
    data.inventory = data.automobile
    delete data.automobile
    delete data.salesPerson
    delete data.automobiles
    delete data.salesPersons
    delete data.customers

    const url ="http://localhost:8090/api/sales/"
    const fetchOptions ={
        method:"post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }

    const response = await fetch(url, fetchOptions)
    if(response.ok){
        this.setState({
            automobile:"",
            salesPerson: "",
            customer:"",
            price:"",
        })
    }
}



handleAutomobileChange(event){
    const value = event.target.value
    this.setState({automobile:value})
}
handleSalesPersonChange(event){
    const value = event.target.value
    this.setState({salesPerson:value})
}
handleCustomerChange(event){
    const value = event.target.value
    this.setState({customer:value})
}
handlePriceChange(event){
    const value = event.target.value
    this.setState({price:value})
}

render(){
    return(
        <div className='row'>
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Record a new sale</h1>
                <form onSubmit={this.handleSubmit} id="new-sale-form">
                <div className="mb-3">
                    <select value={this.state.automobile} onChange={this.handleAutomobileChange}  required id="automobile" name="automobile" className="form-select">
                    <option value="" disabled>Choose an automobile</option>
                    {this.state.automobiles.map(automobile=>{
                        return(
                                <option key={automobile.href} value={automobile.href}>
                                {automobile.vin}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={this.state.salesPerson} onChange={this.handleSalesPersonChange} required id="sales_person" name="sales_person" className="form-select">
                    <option value="" disabled>Choose a sales person</option>
                    {this.state.salesPersons.map(salesperson=>{
                        return(
                                <option  key={salesperson.employee_number} value={salesperson.employee_number}>
                                {salesperson.name}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <div className="mb-3">
                    <select value={this.state.customer} onChange={this.handleCustomerChange} required id="customer" name="customer" className="form-select">
                    <option value="" disabled>Choose a customer</option>
                    {this.state.customers.map(customer=>{
                        return(
                                <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={this.handlePriceChange} value={this.state.price} placeholder="Sale price" required type="number" name="price" id="price" className="form-control"/>
                    <label htmlFor="price">Sale Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
    )
}
}
export default SalesRecordForm;
