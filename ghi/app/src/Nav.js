import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link vehicles-models" to="/vehicles">Vehicles Models</NavLink>
              </li>
              <ul>
              <li className="nav-item">
              <NavLink className="nav-link" to="/vehicles/new">Add a vehicle</NavLink>
              </li>
              </ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturer">Manufacturers</NavLink>
            </li>
            <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manufacturer/new">Add a manufacturer</NavLink>
            </li>
            </ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobile">Automobiles in Stock</NavLink>
            </li>
            <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/automobile/new">Add an automobile</NavLink>
            </li>
            </ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales" >Sales</NavLink>
            </li>
              <ul>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salesperson/new">Add a Sales Person</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/customer/new">Add a Potential Customer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales/new">Add a Sales Record</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/sales">List of All Sales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/salesperson/history">List Sales by Sales Person</NavLink>
              </li>
              </ul>
              <li className="nav-item">
              <NavLink className="nav-link" to="/services/" >Service</NavLink>
            </li>
            <ul>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tech/">Add a technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/new">Enter a service appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/">Scheduled Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services/history">View Service History</NavLink>
            </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
