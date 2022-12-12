import React from "react";

class AllSales extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            salesRecordArray: []
        }
    }

    async componentDidMount(){
        const url = "http://localhost:8090/api/sales/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            this.setState({salesRecordArray: data.salesrecord})
        }
    }

    render(){
        return(
            <div>
                <h1>Sales History</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sales Person</th>
                                <th>Employee Number</th>
                                <th>Customer</th>
                                <th>VIN</th>
                                <th>Sale Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.salesRecordArray.map(sales => {
                                return (
                                    <tr key = {sales.id}>
                                        <td>{sales.sales_person.name}</td>
                                        <td>{sales.sales_person.employee_number}</td>
                                        <td>{sales.customer.name}</td>
                                        <td>{sales.inventory.vin}</td>
                                        <td>{sales.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

        )
    }
}
export default AllSales;
