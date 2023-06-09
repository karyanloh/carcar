import React from "react";
import AutomobileForm from "./AutomobileForm";


class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobilesArray: [],
            showForm: false
        }

    }
    async componentDidMount(){
        const url = "http://localhost:8100/api/automobiles/"
        const response = await fetch(url)
        if(response.ok){
          const data = await response.json()
          const vehicles = data.autos
          this.setState({automobilesArray:vehicles})
        }
      }

    render (){
        return (
            <>
            <div>
                <div>
                <h1>Automobiles Currently in Stock</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Color</th>
                                <th>Year</th>
                                <th>Model</th>
                                <th>Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.automobilesArray.map(automobile =>
                            {
                                return (
                                    <tr key = {automobile.id}>
                                        <td>{automobile.vin}</td>
                                        <td>{automobile.color}</td>
                                        <td>{automobile.year}</td>
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.model.manufacturer.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
                </>
        )
    }
}
export default AutomobileList;
