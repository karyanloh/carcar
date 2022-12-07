import React from "react"

class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {manufacturersArray: this.props.manufacturer
        }

    }


            render() {
                return (
                    <div>
                        <h1>Manufacturers</h1>
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

                        )
                    }
            }
export default ManufacturerList;
