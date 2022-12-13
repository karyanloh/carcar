import React from 'react';

class SalesPersonForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            employeeNumber:""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        data.employee_number = data.employeeNumber
        delete data.employeeNumber

        const url = "http://localhost:8090/api/salesperson/"
        const fetchOptions={
            method:"post",
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(url, fetchOptions)
        if(response.ok){
            const newSalesPerson = await response.json();
            this.setState({
                name:"",
                employeeNumber:""
            })
        }
    }

    handleChange(event, key){
        var value = event
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    render(){
        return(
            <div className='row'>
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a Sales Person</h1>
                <form onSubmit={this.handleSubmit} id="new-salesperson-form">
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "name")}} value={this.state.name} placeholder="Name" required type="text" name="name" id="manufacturer_name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "employeeNumber")}} value={this.state.employeeNumber} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                    <label htmlFor="employee_name">Employee Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
        )
    }
}
export default SalesPersonForm;
