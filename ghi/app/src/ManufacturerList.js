import React from "react"
import NewManufacturerForm from "./NewManufacturerForm"


class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturersArray: this.props.manufacturer,
            showForm: false
        }

    }

    addManufacturer(showFormValue){
        this.setState({
            showForm: showFormValue
        })
    }
    showForm(){
        this.setState({showForm:!this.state.showForm})
    }

            render() {
                return (
                    <>
                        {this.state.showForm?<NewManufacturerForm addManufacturer={this.addManufacturer.bind(this)}/>:
                        <div>
                        <h1>Manufacturers</h1>
                        <button type="button" className="btn btn-secondary" onClick={()=>{this.showForm()}}><a>Add new manufacturer</a></button>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.manufacturersArray.map(manufacturer => {
                                        return (
                                            <tr key = {manufacturer.id}>
                                                <td>{manufacturer.name}</td>

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
export default ManufacturerList;
