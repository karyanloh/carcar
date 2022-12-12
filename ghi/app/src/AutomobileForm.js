import React from 'react';

class AutomobileForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            color: "",
            year:"",
            vin:"",
            modelId:"",
            models:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    async componentDidMount(){
        const url = "http://localhost:8100/api/models/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            this.setState({models: data.models})
        }
    }


    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state}
        data.model_id = data.modelId
        delete data.modelId
        delete data.models
        // console.log("DATA:",data)
        const automobileUrl = "http://localhost:8100/api/automobiles/"
        const fetchOptions={
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }

        const response = await fetch(automobileUrl, fetchOptions)
        if(response.ok){
            const newAutomobile = await response.json();
            // console.log(newAutomobile)
            this.sendDataToList()
        }
    }
    handleChange(event, key){
        // console.log(event, key)
        //var value = event.target.value;
        var value = event
        this.setState({
            ...this.state,
            [key]: value
        })
        // this.props.addVehicle(converted)
    }
    handleModelChange(event){
        const value = event.target.value
        this.setState({modelId:value})
    }
    sendDataToList(){
        this.props.addAutomobile(false)
        this.setState({
            color: "",
            year:"",
            vin:"",
            modelId:""
        })
    }


    render(){
        return(
            <>
            <div className='row'>
                <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add an automobile to inventory</h1>
                <form onSubmit={this.handleSubmit} id="new-automobile-form">
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "color")}} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                    <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "year")}} value={this.state.year} placeholder="Year" required type="text" name="year" id="year" className="form-control"/>
                    <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e)=>{this.handleChange(e.target.value, "vin")}} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                    <label htmlFor="vin">VIN</label>
                </div>
                <div className="mb-3">
                    <select value={this.state.modelId} onChange={this.handleModelChange} required id="model" name="model" className="form-select">
                    <option value="" disabled>Choose a model</option>
                    {this.state.models.map(model=>{
                        return(
                                <option  key={model.id} value={model.id}>
                                {model.name}
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
            </>
        )
    };
}
export default AutomobileForm;
