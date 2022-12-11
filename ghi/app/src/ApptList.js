import React from "react";

class ApptList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // apptArray: this.props.appointments
            appts: [],
        }

    }
    ///filter for "scheduled"
    async componentDidMount() {
        const url = 'http://localhost:8080/api/services/';
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            data.appointments = data.appointments.filter(appointment => appointment.status == "scheduled");
            this.setState({appts: data.appointments});
        }
    }


            //put in a handleclick fxn

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
                        <td>{ appointments.vip}</td>
                        <td>{ appointments.status}</td>
                        {/* <td> <span onClick={()=>{this.handleDeleteHat(hat.href)}}>Delete</span></td> */}
                    </tr>
                );
            })}
        </tbody>
    </table>

        )
    }
}
export default ApptList;
