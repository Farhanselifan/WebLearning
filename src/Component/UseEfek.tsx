import React, { useState, useEffect, useContext, createContext } from 'react';

function Onlyuse() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count sekarang: ${count}`);
  }, [count]);

  return (
    <div className='p-50 w-full bg-amber-200'> 
      <div className='items-center'>
        <h1 className='font-bold text-8xl p-10 '> {count}</h1>
        <button className=' bg-red-300 p-2 rounded-2xl ' onClick={() => setCount(count + 1)}>
          Plus 
        </button>
      </div>
    </div>
  );
}

function TimerComponent() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick...');
    }, 1000);

    // 🧹 Cleanup function
    return () => {
      clearInterval(timer);
      console.log('Timer dibersihkan.');
    };
  }, []); // hanya dijalankan sekali saat mount

  return <p>Lihat console setiap detik</p>;
}


function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
	    const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array - runs once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users List</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Website: {user.website}</p>
        </div>
      ))}
    </div>
  );
}

function TimerCleanUp() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h2>Timer: {seconds}s</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}


/** --------------- 1. Model data --------------- */
interface WeatherData {
  name: string; // Nama kota
  main: {
    temp: number; // Suhu (°C)
    humidity: number; // Kelembapan (%)
  };
  weather: {
    description: string;
    icon: string;
  }[]; // Deskripsi & ikon
}

/** --------------- 2. Komponen --------------- */
function WeatherApp() {
  /* a. State */
  const [city, setCity] = useState<string>("Jakarta");
  const [query, setQuery] = useState<string>(""); // input teks
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /* b. Fetch ketika city berubah */
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using a demo API key - replace with your actual OpenWeatherMap API key
        const API_KEY = "demo_key_replace_with_actual";
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&units=metric&appid=${API_KEY}`
        );
        
        if (!resp.ok) {
          throw new Error(`Status ${resp.status} – ${resp.statusText}`);
        }
        
        const data: WeatherData = await resp.json();
        setWeather(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan jaringan");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  /* c. Handler */
  const handleSearch = () => {
    if (query.trim()) setCity(query.trim());
  };

  /* d. Render */
  return (
    <div className="max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white space-y-4">
      <h1 className="text-2xl font-bold text-center">Weather App</h1>
      
      {/* Form pencarian */}
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg"
          placeholder="Masukkan nama kota"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Cari
        </button>
      </div>

      {/* Status */}
      {loading && <p className="text-center">Memuat ...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {/* Data cuaca */}
      {weather && !loading && (
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <img
            className="mx-auto"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="text-4xl font-bold">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize">{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}



function useEfek() {
  return (
    <div>
      <WeatherApp />
    </div>
  );
}


export default useEfek;