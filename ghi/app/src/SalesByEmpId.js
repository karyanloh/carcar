import React from "react";

class SalesByEmployeeId extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            employees: [],
            salesRecords:[],
            salesPerson:""
        }

        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this)
    }

    handleSalesPersonChange(event){
        const value = event.target.value
           this.setState({salesPerson:value})
    }
    async componentDidMount(){
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            this.setState({salesRecords: data.salesrecord})
        }

        const salespersonUrl = "http://localhost:8090/api/salesperson/"
        const salespersonRes = await fetch(salespersonUrl)
        if(salespersonRes.ok){
            const salespersonData = await salespersonRes.json()
            this.setState({employees: salespersonData.salesperson})
        }
    }


      render(){

        return(
            <div>
                <h1>Sales person history</h1>
                <div className="mb-3">
                    <select value={this.state.salesPerson} onChange={this.handleSalesPersonChange} required id="sales_person" name="sales_person" className="form-select">
                    <option value="" disabled>Choose a sales person</option>
                    {this.state.employees.map(employee=>{
                        return(
                                <option key={employee.id} value={employee.employee_number}>
                                {employee.name}
                                </option>
                        );
                    })}
                    </select>
                </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sales person</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Sale price</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.salesRecords.filter(sales => sales.sales_person.employee_number === this.state.salesPerson).map((sales, idx)=>{
                            return(
                                <tr key = {idx}>
                                        <td>{sales.sales_person.name}</td>
                                        <td>{sales.customer.name}</td>
                                        <td>{sales.inventory.vin}</td>
                                        <td>{sales.price}</td>
                                    </tr>
                              )
                        })

                        }
                        </tbody>
                    </table>
                    </div>
        )
    }
}
export default SalesByEmployeeId;
