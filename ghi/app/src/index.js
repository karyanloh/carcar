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

    root.render(
      <React.StrictMode>
        <App manufacturer={manufacturerData.manufacturers}
        vehicleModel={vehicleModelData.models}
        automobile={automobileData.autos} />
      </React.StrictMode>
    );
}else{
  console.error()
}
}
loadData();
