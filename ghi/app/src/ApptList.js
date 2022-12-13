import React from "react";

class ApptList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            appts: [],
        }


    }

    async componentDidMount() {
        const url = 'http://localhost:8080/api/services/';
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            data.appointments = data.appointments.filter(appointment => appointment.status === "scheduled");
            this.setState({appts: data.appointments});
        }
    }



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
                        <td>{ appointments.technician.emp_name }</td>
                        <td>{ appointments.appt_reason }</td>
                        <td>{ appointments.vip ? "Yes": "No"}</td>
                        <td>
                            <button onClick = {this.handleClick} name = {appointments.id} value = "cancelled" type = "button" className = "btn btn-danger">
                                Cancel</button>
                            <button onClick = {this.handleClick} name = {appointments.id} value = "finished" type = "button" className = "btn btn-info"> Finished</button>
                        </td>

                    </tr>
                );
            })}
        </tbody>
    </table>

        )
    }
}
export default ApptList;
