import React from "react"

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {manufacturersArray: this.props.manufacturer
        }

    }


            render() {
                return (

                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>Manufacturer</th>
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
                    )
            }
    }
export default ManufacturerList;
