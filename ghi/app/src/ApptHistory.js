import React from "react";

class ApptHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // apptsFiltered: [],
            appts: [],
            // automobiles: [],
            // automobile: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.handleClick = this.handleClick.bind(this)

    }

    async handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8080/api/services/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            const filter = data.appointments.filter((appointments) => {
                return appointments.vin === this.state.search
            })
            this.setState({appts: filter})
        }
    }

    handleChange(event) {
        const value = event.target.value
        this.setState({search: value})
    }
    // async componentDidMount() {
    //     let url = 'http://localhost:8080/api/services/';
    //     const response = await fetch(url)

    //     if (response.ok) {
    //         const data = await response.json();
    //         data.appointments = data.appointments.filter(appointment => appointment.status === "finished");
    //         this.setState({appts: data.apppointments});
    //         this.setState({apptsFiltered: data.appointments});
    //         }
    //     url = 'http://localhost:8100/api/automobiles';
    //     response = await fetch(url);

    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({automobiles: data.automobiles})
    //     }
    // }
    // async handleClick(event){
    //     event.preventDefault()
    //     const autoVin = this.state.automobile;
    //     let appts = this.state.appts;
    //     let apptsFiltered = appts.filter(appointment => appointment.vin == autoVin);
    //     this.setState({apptsFiltered: apptsFiltered})
    // }

    // handleChange(event) {
    //     const value = event.target.value;
    //     const name = event.target.name;
    //     this.setState({[name]: value});
    // }


    render(){
        return(
            //    <div className='row'>
            //     <div className="offset-3 col-6">
            //     <div className="shadow p-4 mt-4">
            <div>
            <form>
                <div>
                <input value = {this.state.search} onChange = {this.handleChange} type = "text" className = "form-control" placeholder = "VIN" id="search" name = "search" />
                <button onClick={this.handleSubmit} className = "btn btn-info">Service History by Vin</button>
                </div>
            </form>

                <h1>Service History</h1>
{/*


                    <div className = "mb-3">
                        <select onChange={this.handleChange} value = {this.state.automobile.vin} required id = "automobile" name = "automobile" className = "form-select">
                            <option value = "">Select a vehicle</option>
                            {this.state.automobiles.map(automobile => {
                                return (
                                    <option key={automobile.vin} value = {automobile.vin}>
                                        {automobile.model.manufacturer.name} {automobile.model.name} ({automobile.vin})
                                    </option>
                                )
                            })}

                        </select>

                    </div>
                    <div>
                        <button onClick = {this.handleClick} type = "button" className="btn btn-info">Search</button>
                    </div>
                    <div> */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Appointment Date/Time</th>
                                <th>Assigned Technician</th>
                                <th>Reason for Appointment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appts.map((appointments) => {
                                return (
                                    <tr key={appointments.id}>
                                        <td>{ appointments.cust_name}</td>
                                        <td>{ appointments.appt_date }</td>
                                        <td>{ appointments.technician.emp_name }</td>
                                        <td>{ appointments.appt_reason }</td>
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>
                    </div>
        );

    }
}

export default ApptHistory;
