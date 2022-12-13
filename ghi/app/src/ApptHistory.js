import React from "react";

class ApptHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            appts: [],

        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

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


    render(){
        return(

            <div>
            <form>
                <div>
                <input value = {this.state.search} onChange = {this.handleChange} type = "text" className = "form-control" placeholder = "VIN" id="search" name = "search" />
                <button onClick={this.handleSubmit} className = "btn btn-info">Service History by Vin</button>
                </div>
            </form>

                <h1>Service History</h1>
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
