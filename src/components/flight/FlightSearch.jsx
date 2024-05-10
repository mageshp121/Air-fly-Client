import React, { useEffect, useState } from "react";
import FlightCards from "./FlightCards";
import { flightSearch } from "../../utils/api/axios.PostAPi";
import { getAllFlights } from "../../utils/api/axios.GetApi";
import { lineSpinner } from "ldrs";
lineSpinner.register();
function FlightSearch() {
  // Define state variables for other inputs
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState("");
  const [flightData, setFlightData] = useState([]);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    handleGetAllFlight();
  }, []);
  // Hardcoded location data
  const locationsStarting = [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    { id: 3, name: "Singapore" },
  ];
  const locationArrival = [
    { id: 4, name: "London" },
    { id: 5, name: "Toronto" },
    { id: 6, name: "Tokyo" },
  ];
  // Getting All flight data
  const handleGetAllFlight = async () => {
    const response = await getAllFlights();
    setFlightData(response.data);
    return;
  };

  // Handle search function
  const handleSearch = async () => {
    setLoad(true);
    const response = await flightSearch({
      from,
      to,
      depart,
      returnDate,
      travellers,
    });
    if (response.status === 200) {
      setLoad(false);
      setFlightData(response.data);
    } else {
      setLoad(false);
      setFlightData([]);
    }
  };
  return (
    <>
      <div className="flex p-5 justify-evenly items-center bg-white rounded-xl shadow-2xl h-40 mt-10 m-14">
        <div>
          <label htmlFor="from" className="text-base font-medium text-gray-400">
            From
          </label>
          <select
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="block  w-44 px-5 py-4 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-500 rounded-md focus:outline-none leading-relaxed"
            required
          >
            <option value="">Select From</option>
            {locationsStarting.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="to" className="text-base font-medium text-gray-400">
            To
          </label>
          <select
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="block  w-44 px-6 py-4 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-500 rounded-md focus:outline-none leading-relaxed"
            required
          >
            <option value="">Select To</option>
            {locationArrival.map((location) => (
              <option className="" key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="depart"
            className="text-base font-medium text-gray-400"
          >
            Depart
          </label>
          <input
            type="date"
            id="depart"
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className="block w-44 px-5 py-4 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-500 rounded-md focus:outline-none leading-relaxed"
            required
          />
        </div>
        <div>
          <label
            htmlFor="return"
            className="text-base font-medium text-gray-400"
          >
            Return
          </label>
          <input
            type="date"
            id="return"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="block  w-44 px-5 py-4 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-500 rounded-md focus:outline-none leading-relaxed"
            required
          />
        </div>
        <div>
          <label
            htmlFor="travellers"
            className="text-base font-medium text-gray-400"
          >
            Travellers
          </label>
          <select
            id="travellers"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            className="block  w-44 px-5 py-4 text-sm font-normal shadow-xs text-gray-900 bg-transparent border border-gray-500 rounded-md focus:outline-none leading-relaxed"
            required
          >
            <option value="">Select Travellers</option>
            <option value="1">1</option>
            <option value="2">2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="items-center hover:-translate-y-1 transition-all duration-500 justify-center mt-6 hidden px-2 py-3 w-36 ml-10 text-base font-semibold text-white shadow-lg bg-black border border-transparent rounded-lg lg:inline-flex"
          >
            Search
          </button>
        </div>
      </div>
      <div className="p-5 justify-center overflow-auto flex-row bg-white rounded-xl shadow-2xl h-[750px] mt-10 m-28">
        {load ? (
          <div
            className="flex mt-48
        items-center justify-center w-full"
          >
            <l-line-spinner
              size="40"
              stroke="3"
              speed="1"
              color="black"
            ></l-line-spinner>
          </div>
        ) : flightData.length !== 0 ? (
          flightData.map((flight) => {
            console.log(flight);
            return <FlightCards flightData={flight} />;
          })
        ) : (
          <div
            className=" mt-48
     justify-center ml-[460px] flex-row w-full"
          >
            <h1 className="text-4xl">No data found</h1>
            <h1>please Select the correct options</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default FlightSearch;
