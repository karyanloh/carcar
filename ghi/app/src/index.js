import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadData(){
  const manufacturerResponse = await fetch("http://localhost:8100/api/manufacturers/");
  const vehicleModelResponse = await fetch("http://localhost:8100/api/models/");
  const automobileResponse = await fetch("http://localhost:8100/api/automobiles/");
  const salesPersonRes = await fetch("http://localhost:8090/api/salesperson/");
  const customerRes = await fetch("http://localhost:8090/api/customer/");
  const salesRecordRes = await fetch("http://localhost:8090/api/sales/");

  if(
    manufacturerResponse.ok &&
    vehicleModelResponse.ok &&
    automobileResponse.ok &&
    salesPersonRes.ok &&
    customerRes.ok &&
    salesRecordRes.ok

    ){
    const manufacturerData = await manufacturerResponse.json()
    const vehicleModelData = await vehicleModelResponse.json()
    const automobileData = await automobileResponse.json()
    const salesPersonData = await salesPersonRes.json()
    const customerData = await customerRes.json()
    const salesRecordData = await salesRecordRes.json()

    root.render(
      <React.StrictMode>
        <App
        manufacturer={manufacturerData.manufacturers}
        vehicleModel={vehicleModelData.models}
        automobile={automobileData.autos}
        salesPerson={salesPersonData.salesperson}
        customer={customerData.customer}
        salesRecord={salesRecordData.salesrecord}
        />
      </React.StrictMode>
    );
}else{
  console.error()
}
}
loadData();
