import React, { useState,useEffect } from "react";
import "./App.css";


function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];
  const [isLoading,setLoading] = useState(true);
  const [vehicles,setVehicle] = useState([]);
  const [country,setCountry] = useState([]);
  const [selectCountry,setSelectCountry] = useState("");
  const [searchKey,setSearchKey] = useState("");
  

function fetchWMI(){

  fetch(`https://localhost:44313/api/WMI/Vehicles?country=`+selectCountry +`&searchbyName=`+searchKey)
  .then(res => res.json())
  .then(json => {
    setVehicle(json);
  })
}
useEffect(() => {
  try{

    fetchWMI();

  fetch(`https://localhost:44313/api/WMI/Country`)
  .then(res => res.json())
  .then(json => {
    setCountry(json)
    console.log(json)
    
  })
  }catch{

  }finally{
    setLoading(false);
  }
    },[])

    const loadData =() => {
      if(vehicles !== null){
          return vehicles.map((d) => {
            const wmi = d.wmi;
           
            return (
              <tr key={wmi}>
                {keys.map((k) => (
                  
                  <td key={`${wmi}-${k}`}>{d[k.toLowerCase()]}</td>
                ))}
              </tr>
              )
          })
      }
    }


  function onSelectStateChange(event){
    setSelectCountry(event.target.value);
  }
function onSearchInput(event){
  setLoading(true);
  setSearchKey(event.target.value);
  setLoading(false);
}

function onSearchClick(){
  fetchWMI();
}
  if(isLoading === false){
    return (
    
      <div className="App">
        <div className="SearchBox">
          <p>Search Filter</p>
        <input type="text" placeholder="filter by name" onChange={onSearchInput}></input>
        <select onChange={onSelectStateChange}>
        <option value="">Select Country</option>
        {country.map((k) => (<option key={k} value={k}>{k}</option>))}
        </select>
        <button onClick={onSearchClick}>Search</button>
        </div>
        <header>WMI Data - Honda | Total: {vehicles.length}</header>
        <table>
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>{loadData()}</tbody>
        </table>
      </div>
    );
  }
   else
  {
    return (<div>Loading...</div>)
  }
}
export default App;
