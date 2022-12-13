import React from 'react';

class VehiclesList extends React.Component{
    constructor(props){
        super(props);

        this.state={
            vehiclesArray: [],
            showForm: false
        }
    }

    async componentDidMount(){
      const url = "http://localhost:8100/api/models/"
      const response = await fetch(url)
      if(response.ok){
        const data = await response.json()
        const vehicles = data.models
        this.setState({vehiclesArray:vehicles})
      }
    }
render(){
    return(
        <>
        <div>
        <h1>Vehicle models</h1>
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
          </>
    )
}
}
export default VehiclesList;
