import React from "react";

class CustomerForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name:"",
            address:"",
            phoneNumber:""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        data.phone_number = data.phoneNumber
        delete data.phoneNumber

        const url = "http://localhost:8090/api/customer/"
        const fetchOptions = {
            method:"post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await fetch(url, fetchOptions)
        if(response.ok){
            const newCustomer = response.json()
            console.log(`New customer successfully added! ${newCustomer}`)
            this.setState({
                name:"",
                address:"",
                phoneNumber:""
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
                <h1>Add a Potential Customer</h1>
                <form onSubmit={this.handleSubmit} id="new-customer-form">
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "name")}} value={this.state.name} placeholder="Name" required type="text" name="name" id="manufacturer_name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "address")}} value={this.state.address} placeholder="Address" required type="text" name="address" id="adress" className="form-control"/>
                    <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "phoneNumber")}} value={this.state.phoneNumber} placeholder="Phone number" required type="int" name="name" id="phone_number" className="form-control"/>
                    <label htmlFor="phone_number">Phone number</label>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
        )
    }
}
export default CustomerForm;
