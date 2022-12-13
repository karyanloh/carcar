import React from "react"



class ManufacturerList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            manufacturersArray: [],
            showForm: false
        }

    }

    async componentDidMount(){
        const url = "http://localhost:8100/api/manufacturers/"
        const response = await fetch(url)
        if(response.ok){
            const data = await response.json()
            this.setState({manufacturersArray: data.manufacturers})
        }
    }

            render() {
                return (
                    <>
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
                    </>
                        )
                    }
            }
export default ManufacturerList;
