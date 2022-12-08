import React from "react";

class NewManufacturerForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
    }

    // async componentDidMount(){
    //     const url = "http://localhost:8100/api/manufacturers/"
    //     const response = await fetch(url);
    //     if(response.ok) {
    //         const data = await response.json();
    //         this.setState({name: data.names});
    //     }
    // }

    async handleSubmit(event) {
        event.preventDefault()
        const data = {...this.state}

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/"
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(manufacturerUrl, fetchOptions);
        if (response.ok){
            const newManufacturer = await response.json();
            // this.setState({
            //     name: "",

            // });
            this.sendDataToList()
        }
    }
    handleChangeName(event) {
        const value = event.target.value;
        this.setState({name: value});
    }
    sendDataToList(){
        this.props.addManufacturer(false)
        this.setState({
            name: "",

        })
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new manufacturer</h1>
                <form onSubmit={this.handleSubmit} id="new-manufacturer-form">
                  <div className="form-floating mb-3">
                    <input onChange={this.handleChangeName} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                    <label htmlFor="name">Name</label>
                  </div>
                <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default NewManufacturerForm;
