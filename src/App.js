import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const keys = ["Name", "WMI", "Country", "CreatedOn", "VehicleType"];
  const [isLoading, setLoading] = useState(true);
  const [vehicles, setVehicle] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchFilter, setSearchFilter] = useState("searchByName");

  useEffect(() => {
    fetchCountry();
    fetchVehicles();
  }, []);

  function fetchVehicles() {
    try {
      setLoading(true);
      fetch(
        `https://localhost:44313/api/WMI/Vehicles?country=` +
          selectCountry +
          `&` +
          searchFilter +
          `=` +
          searchKey
      )
        .then((res) => res.json())
        .then((json) => {
          setVehicle(json);
        });
    } catch {
    } finally {
      setLoading(false);
    }
  }

  function fetchCountry() {
    try {
      setLoading(true);
      fetch(`https://localhost:44313/api/WMI/Country`)
        .then((res) => res.json())
        .then((json) => {
          setCountry(json);
        });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  const loadData = () => {
    if (vehicles !== null) {
      return vehicles.map((d) => {
        const wmi = d.wmi;

        return (
          <tr key={wmi}>
            {keys.map((k) => (
              <td key={`${wmi}-${k}`}>{d[k.toLowerCase()]}</td>
            ))}
          </tr>
        );
      });
    }
  };

  function onSelectStateChange(event) {
    setSelectCountry(event.target.value);
  }
  function onSearchInput(event) {
    setSearchKey(event.target.value);
  }

  function onSearchRaidChange(event) {
    switch (event.target.value) {
      case "name":
        setSearchFilter("searchByName");
        break;

      case "wmi":
        setSearchFilter("searchByWMI");
        break;
      case "vehicleType":
        setSearchFilter("searchByVehicleType");
        break;
    }
  }
  function onSearchClick() {
    fetchVehicles();
    console.log(searchFilter);
  }
  if (isLoading === false) {
    return (
      <div className="container pt-3">
        <header>
          <h1 className="text-center">
            WMI Data - Honda | Total: {vehicles.length}
          </h1>
        </header>
        <div className="card">
          <div className="card-body">
            <h3>Search</h3>
            <div className="row g-3 align-items-center my-2">
              <div className="col-auto">
                <input
                  type="text"
                  placeholder="filter by name"
                  onChange={onSearchInput}
                  className="form-control"
                ></input>
              </div>
              <div className="col-auto">
                <select onChange={onSelectStateChange} className="form-select">
                  <option value="">Select Country</option>
                  {country.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <button
                  onClick={onSearchClick}
                  className="btn btn-primary form-control"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row g-4 align-items-center">
              <div className="col-auto">
                <label htmlFor="filter-by" className="col-form-label">
                  Filter By:
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="radio"
                  name="search-option"
                  onChange={onSearchRaidChange}
                  checked={searchFilter === "searchByName"}
                  value="name"
                />{" "}
                Name
              </div>
              <div className="col-auto">
                <input
                  type="radio"
                  name="search-option"
                  onChange={onSearchRaidChange}
                  checked={searchFilter === "searchByWMI"}
                  value="wmi"
                />{" "}
                WMI
              </div>
              <div className="col-auto">
                <input
                  type="radio"
                  name="search-option"
                  onChange={onSearchRaidChange}
                  checked={searchFilter === "searchByVehicleType"}
                  value="vehicleType"
                />{" "}
                Vehicle Type
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead className="table-primary">
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
  } else {
    return <div>Loading...</div>;
  }
}
export default App;
