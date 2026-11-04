import { useState, useEffect} from "react";
import SearchBar from "./SearchBar";

type Weather = {
  temp: string | number;
  desc: string;
};

function App() {
  const [city, setCity] = useState("Tehran");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!city.trim()) return;
    setError("");
    setLoading(true);
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
    } finally{
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if(!city.trim()){
      setWeather(null);
      setError("");
      return;
    }
    const timer = setTimeout(() => {
        handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-5 text-white font-[Tahoma,sans-serif] bg-linear-to-b from-[#1e3c72] via-[#2a5298] to-[#74ebd5]">
      <div className="flex flex-col w-full max-w-[400px] gap-5">
        <h1 className="text-4xl font-bold text-white text-center">Weather App</h1>
        <SearchBar value={city} onChange={setCity} />
        {loading && <p className="text-center text-base">Loading...</p>}
        {error && <p className="text-center text-base">{error}</p>}
        {weather && (<p className="text-center text-base">{city}: {weather.temp}°C, {weather.desc}</p>)}
      </div>
    </div>
  );
}

export default App;