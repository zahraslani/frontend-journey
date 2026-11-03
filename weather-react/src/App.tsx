import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import './App.css'

type Weather = {
  temp: string | number;
  desc: string;
};

function App() {
  const [city, setCity] = useState("Tehran");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city.trim()) return;
    setError("");
    try {
      const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      const current = data.current_condition[0];
      setWeather({
        temp: current.temp_C,
        desc: current.weatherDesc[0].value,
      });
    } catch {
      setWeather(null);
      setError("Could not load weather. Try another city.");
    }
  }
  
  useEffect(() => {
    if(!city) return;
    const timer = setTimeout(() => {
        handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [handleSearch]);

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <SearchBar value={city} onChange={setCity} onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {weather && (
        <p>
          {city}: {weather.temp}°C, {weather.desc}
        </p>
      )}
    </div>
  );
}

export default App;