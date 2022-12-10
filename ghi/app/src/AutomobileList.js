import React from "react";
import AutomobileForm from "./AutomobileForm";


class AutomobileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobilesArray: this.props.automobile,
            showForm: false
        }

    }

    addAutomobile(showFormValue){
        this.setState({
            showForm:showFormValue
        })
    }
    showForm(){
        this.setState({showForm:!this.state.showForm})
    }
    render (){
        return (
            <>
            <div>
                {this.state.showForm?
                <AutomobileForm addAutomobile={this.addAutomobile.bind(this)}/>
                :
                <div>
                <h1>Automobiles Currently in Stock</h1>
                <button type="button" className="btn btn-secondary" onClick={()=>{this.showForm()}}>Add new automobile</button>
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
                }

                </div>
                </>
        )
    }
}
export default AutomobileList;
