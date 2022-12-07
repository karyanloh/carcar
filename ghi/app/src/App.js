import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehiclesList from "./VehiclesList"

function App(props) {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* <Route path="manufacturer" element={<Manufacturers manufacturer={props.manufacturer} />} /> */}
          <Route path="vehicles" element={<VehiclesList vehicleModel={props.vehicleModel} />} />
          {/* <Route path="automobile" element={<Automobiles automobile={props.automobile} />} /> */}
          {/* <Route path="manufacturer/new" element={<ManufacturerForm manufacturer={props.manufacturer}/>}/> */}
          {/* <Route path= "vehicles/new" element = {<VehicleForm vehicleModel={props.vehicleModel}/>}/> */}
          {/* <Route path= "automobile/new" element = {<AutomobileForm automobile={props.automobile}/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
