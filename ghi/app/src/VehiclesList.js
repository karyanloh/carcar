import React from 'react';
import { renderMatches } from 'react-router-dom';
import VehicleForm from './VehicleForm.js'

class VehiclesList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            vehiclesArray: this.props.vehicleModel,
            showForm: false
        }
    }

    addVehicle(showFormValue){
        this.setState({
            showForm:showFormValue
        })
    }
    showForm(){
        this.setState({showForm:!this.state.showForm})
    }

render(){
    return(
        <>
        {this.state.showForm?<VehicleForm addVehicle={this.addVehicle.bind(this)}/>:
        <div>
        <h1>Vehicle models</h1>
         <button type="button" className="btn btn-secondary" onClick={()=>{this.showForm()}}><a>Add new vehicle</a></button>
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
          </div>
            }
          </>
    )
}
}
export default VehiclesList;
