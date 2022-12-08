import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import VehiclesList from "./VehiclesList"
import VehicleForm from './VehicleForm';
import ManufacturerList from './ManufacturerList';
import NewManufacturerForm from './NewManufacturerForm';
import './index.css'
import AutomobileList from './AutomobileList';
import AutomobileForm from './AutomobileForm';
import react, {useEffect, useState} from 'react';

function App(props) {

  // if(props.manufacturers == undefined){
  //   return null;
  // }



  // useEffect(()=>{

  // },[])
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer" element={<ManufacturerList manufacturer={props.manufacturer} />} />
          <Route path="vehicles" element={<VehiclesList vehicleModel={props.vehicleModel} />} />
          <Route path="automobile" element={<AutomobileList automobile={props.automobile} />} />
          <Route path="manufacturer/new" element={<NewManufacturerForm manufacturer={props.manufacturer}/>}/>
          <Route path= "vehicles/new" element = {<VehicleForm vehicleModel={props.vehicleModel}/>}/>
          <Route path= "automobile/new" element = {<AutomobileForm automobile={props.automobile}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
