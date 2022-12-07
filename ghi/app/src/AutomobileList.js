import React from "react";

class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {automobilesArray: this.props.automobile
        }
    }

    render (){
        return (
            <div>
                <h1>Automobiles Currently in Stock</h1>
                <button type="button" className="btn btn-secondary"><a href='automobile/new'>Add new automobile</a></button>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Color</th>
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
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.model.manufacturer.name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        )
    }
}
export default AutomobileList;
