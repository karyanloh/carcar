import React from 'react';

class VehicleForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            name: "",
            pictureUrl:"",
            manufacturer:"",
            manufacturers:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            this.setState({manufacturers: data.manufacturers})
        }
    }


    async handleSubmit(event){
        console.log("submitted")
        event.preventDefault();
        const data = {...this.state}
        data.picture_url = data.pictureUrl
        delete data.pictureUrl
        delete data.manufacturer

        const vehicleUrl = "http://localhost:8100/api/models/"
        const fetchOptions={
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(vehicleUrl, fetchOptions)
        if(response.ok){
            const newVehicle = await response.json();
            console.log("newVeh:",newVehicle)
            this.props.addVehicle(...this.state)
            // this.props.addVehicle(newVehicle)
            this.setState({
                name:"",
                pictureUrl:"",
                manufacturer:""
            })
        }
    }
    handleChange(event, key){
        console.log(event, key)
        //var value = event.target.value;
        var value = event
        this.setState({
            ...this.state,
            [key]: value
        })
        // this.props.addVehicle(converted)
    }

    render(){
        return(
            <>
            <div className='row'>
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new vehicle</h1>
                <form onSubmit={this.handleSubmit} id="new-vehicle-form">
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "name")}} value={this.state.name} placeholder="Name" required type="text" name="name" id="manufacturer_name" className="form-control"/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "pictureUrl")}} value={this.state.pictureUrl} placeholder="Picture URL" required type="url" name="pictureUrl" id="pictureUrl" className="form-control"/>
                    <label htmlFor="picture_url">Picture Url</label>
                </div>
                <div className="mb-3">
                    <select value={this.state.manufacturer} onChange={(e)=>{this.handleChange(e.target.value, "manufacturer")}} required id="manufacturer" name="manufacturer" className="form-select">
                    <option value="" disabled>Choose a manufacturer</option>
                    {this.state.manufacturers.map(manufacturer=>{
                        return(
                                <option  key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        );
                    })}
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>
            {/* <div onClick={()=>{this.prepareFormData('abc')}}>add</div> */}
            {/* <div onClick={()=>{this.props.addVehicle('data')}}>add</div> */}
            </>
        )
    };
}
export default VehicleForm;