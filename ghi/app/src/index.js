import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadData(){
  const manufacturerResponse = await fetch("http://localhost:8100/api/manufacturers/");
  const vehicleModelResponse = await fetch("http://localhost:8100/api/models/");
  const automobileResponse = await fetch("http://localhost:8100/api/automobiles/");

  if(manufacturerResponse.ok && vehicleModelResponse.ok && automobileResponse.ok){
    const manufacturerData = await manufacturerResponse.json()
    const vehicleModelData = await vehicleModelResponse.json()
    const automobileData = await automobileResponse.json()
        console.log("ManufacturerData:", manufacturerData)
        console.log("VehModelData:",vehicleModelData)
        console.log("AutomobileData:",automobileData)
    root.render(
      <React.StrictMode>
        <App manufacturer={manufacturerData.manufacturers} vehicleModel={vehicleModelData.vehicleModel} automobile={automobileData.automobile}/>
      </React.StrictMode>
    );
}else{
  console.error()
}
}
loadData();
