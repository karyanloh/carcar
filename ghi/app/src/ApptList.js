import React from "react";

class ApptList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // apptArray: this.props.appointments
            appts: [],
        }

        // this.cancelAppointment = this.cancelAppointment.bind(this);
        // this.finishAppointment = this.finishAppointment.bind(this);

    }
    ///filter for "scheduled"
    async componentDidMount() {
        const url = 'http://localhost:8080/api/services/';
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            data.appointments = data.appointments.filter(appointment => appointment.status === "scheduled");
            this.setState({appts: data.appointments});
        }
    }

            //put in a handleclick fxn for buttons

    async handleClick(event) {
        event.preventDefault();
        const statusUpdate = event.target.value;
        const apptId = event.target.name;
        const data = {status: statusUpdate};
        const body = JSON.stringify(data)

        const url = `http://localhost:8080/api/services/${apptId}`;
        const fetchConfig = {
            method: 'put',
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },

        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const updateService = await response.json();

        }
    }

    // async cancelAppointment(appointment) {
    //     const cancelUrl = `http://localhost:8080/api/services/${appointment.id}`
    //     let fetchConfig = {
    //         method: "delete"
    //     }
    //     await fetch(cancelUrl, fetchConfig)
    //     console.log(cancelUrl, fetchConfig)

    //     const idx = this.state.appointments.indexOf(appointment)
    //     console.log(idx)
    //     const cancelled_appts = [...this.state.appointments]
    //     cancelled_appts.splice(idx, 1)
    //     this.setState({appts: cancelled_appts})
    // }

    // async finishAppointment(appointment) {
    //     const finishUrl = `http://localhost:8080/api/services/${appointment.id}`
    //     const fetchConfig = {
    //         method: "put",
    //         body: JSON.stringify({"completed": "True"}),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }

    //     await fetch(finishUrl, fetchConfig)
    //     const idx = this.state.appointments.indexOf(appointment)
    //     const finished_appts = [...this.state.appointments]
    //     finished_appts.splice(idx, 1)
    //     this.setState({ appts: finished_appts})
    // }


    render() {
        return (
            <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Customer Name</th>
                    <th>Appointment Date/Time</th>
                    <th>Assigned Technician</th>
                    <th>Reason for Appointment</th>
                    <th>VIP</th>
                    <th>Appointment Status</th>
                </tr>
            </thead>
            <tbody>
            {this.state.appts.map(appointments => {
                return (
                    <tr key={appointments.id}>
                        <td>{ appointments.vin}</td>
                        <td>{ appointments.cust_name}</td>
                        <td>{ appointments.appt_date }</td>
                        <td>{ appointments.technician.emp_number }</td>
                        <td>{ appointments.appt_reason }</td>
                        <td>{ appointments.vip ? "Yes": "No"}</td>
                        {/* <td>{ appointments.status}</td> */}
                        <td>
                            <button onClick = {this.handleClick} name = {appointments.id} value = "cancelled" type = "button" className = "btn btn-danger">
                                Cancel</button>
                            <button onClick = {this.handleClick} name = {appointments.id} value = "finished" type = "button" className = "btn btn-info"> Finished</button>
                        </td>
                        {/* <td><button className = "btn btn-danger" onClick = {() => this.cancelAppointment(appointments)}>Cancel</button></td>
                        <td><button className = "btn btn-info" onClick = {() => this.finishAppointment(appointments)}>Completed</button></td> */}

                    </tr>
                );
            })}
        </tbody>
    </table>

        )
    }
}
export default ApptList;
