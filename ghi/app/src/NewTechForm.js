import React from "react";

class NewTechForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            empName: "",
            empNumber: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
    }

    // async componentDidMount(){

    // }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        data.emp_name = data.empName;
        data.emp_number = data.empNumber;
        delete data.empName;
        delete data.empNumber;
        // console.log(data)

        const techUrl = "http://localhost:8080/api/tech/"
        const fetchOptions = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(techUrl, fetchOptions);
        if(response.ok){
            const newTech = await response.json();
            // console.log('testing')
                this.setState({
                    empName:"",
                    empNumber:"",
                });

        }
    }

    handleChangeName(event) {
        const value = event.target.value;
        this.setState({empName: value});
    }

    handleChangeNumber(event) {
        const value = event.target.value;
        this.setState({empNumber: value});
    }
    render() {
        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create a new technician</h1>
                  <form onSubmit={this.handleSubmit} id="new-tech-form">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChangeName} value={this.state.empName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={this.handleChangeNumber} value={this.state.empNumber} placeholder= "Number" required type="text" name="number" id="number" className="form-control" />
                      <label htmlFor="number">Employee Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}

export default NewTechForm;
