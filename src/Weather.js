import React, { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const callWeatherApi = async() => {
    console.log("api fun called");
    try{
   await fetch(
      `https://my.meteoblue.com/packages/current?apikey=eE7hvrQWUFkGO61J&lat=${latitude}&lon=${longitude}&asl=44&format=json`)
      .then((data) => data.json())
      .then((data) => setWeatherData(data));
    console.log(weatherData);
   }
   catch(error){ console.error("Error fetching weather data:", error)}
  };


  return (
    <>
      <div className="grid xl:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 mx-auto">
        <div className="col-span-1 p-4 mx-auto mt-44 rounded bg-white shadow">
          <div className="grid grid-cols-1 divide-y">
            <div className="text-sky-400 font-medium p-3">Weather App</div>

            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="Enter Latitude"
                value={latitude}
                onChange={(event) => {
                  setLatitude(event.target.value);
                }}
                className="w-full mx-3 my-6 border rounded-sm shadow-md border-slate-100 text-slate-500 px-2 py-1 placeholder:text-slate-300 text-center focus:border-gray-300 outline-none"
              />
              <input
                type="text"
                placeholder="Enter Longitude"
                value={longitude}
                onChange={(event) => {
                  setLongitude(event.target.value);
                }}
                className="w-full mx-3 my-6 border rounded-sm shadow-md text-slate-500 border-slate-100 px-2 py-1 placeholder:text-slate-300 text-center focus:border-gray-300 outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-sky-400 px-2 py-1 mt-5 rounded text-white"
                onClick={callWeatherApi}
              >
                Check
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1 px-10 py-5 mx-auto mt-44 bg-white rounded shadow">
          <div className="grid grid-cols-1 divide-y">
            <div className="text-sky-400 font-medium p-2">Weather App</div>
            <div className="flex items-center justify-center px-20 py-5">
              {!latitude && longitude ? (
                <p>No data found</p>
              ) : (
                <ul>
                  <li className="text-slate-500 h-8">Latitude: {weatherData?.metadata?.latitude}</li>
                  <li className="text-slate-500 h-8">Longitude: {weatherData?.metadata?.longitude}</li>
                  <li className="text-slate-500 h-8">
                    Temperature: {weatherData?.data_current?.temperature}
                    <sup>o</sup>C
                  </li>
                </ul>
              )}
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
