import React from 'react';
import { renderMatches } from 'react-router-dom';
import Form from './VehicleForm.js'

class VehiclesList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            vehiclesArray: this.props.vehicleModel,
            test:""
        }
    }

    addVehicle(value){
        this.state.vehiclesArray.push(value)
        const refresh = this.state.vehiclesArray
        this.setState({vehiclesArray:refresh})
    }


render(){
    return(
        <>
         <Form addVehicle={this.addVehicle.bind(this)}/>
        <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {this.state.vehiclesArray.map(vehicle => {
                return (

                  <tr key={vehicle.id}>
                    <td>{ vehicle.name }</td>
                    <td>{ vehicle.manufacturer.name }</td>
                    <td><img className="rounded float-left" src={ vehicle.picture_url }/></td>
                  </tr>

                );
              })}
            </tbody>
          </table>
          </>
    )
}
}
export default VehiclesList;
