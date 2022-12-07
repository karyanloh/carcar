import React from 'react';
import { renderMatches } from 'react-router-dom';

class VehiclesList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            vehiclesArray: this.props.vehicleModel
        }
    }


render(){
    return(
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
    )
}
}
export default VehiclesList;
