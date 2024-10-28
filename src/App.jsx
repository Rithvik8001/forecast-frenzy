import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import FiveDayForecast from "./components/FiveDayForecast";
import { getWeatherData, getFiveDayForecast } from "./utils/api";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (location) => {
    try {
      const data = await getWeatherData(location);
      if (data) {
        setWeatherData(data);
        const forecast = await getFiveDayForecast(location);
        setForecastData(forecast);
        setError(null);
      } else {
        setError(
          "Unable to find weather data for this location. Please try again."
        );
        setWeatherData(null);
        setForecastData(null);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError(
        "An error occurred while fetching weather data. Please try again."
      );
      setWeatherData(null);
      setForecastData(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-500 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-6 font-sans transition-all duration-300">
      <div className="w-full max-w-md space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#FFFFFF]/90 dark:bg-[#242426]/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-[#D1D1D6]/40 dark:border-[#2D2D2F]/40"
        >
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-5 text-[#1C1C1E] dark:text-[#F2F2F7] tracking-wide">
              Forecast Frenzy
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-[#FEEAEA]/90 dark:bg-[#3A1A1E]/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden border border-[#FFCCCC]/40 dark:border-[#6E1A1F]/40"
          >
            <p className="p-4 text-[#B00020] dark:text-[#FFB2A0] text-sm font-medium">
              {error}
            </p>
          </motion.div>
        )}

        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b from-[#FFFFFF]/80 to-[#F0F0F5]/80 dark:from-[#242426]/80 dark:to-[#2B2B2F]/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-[#D1D1D6]/40 dark:border-[#2D2D2F]/40"
          >
            <WeatherInfo data={weatherData} />
          </motion.div>
        )}

        {forecastData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b from-[#FFFFFF]/80 to-[#F0F0F5]/80 dark:from-[#242426]/80 dark:to-[#2B2B2F]/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-[#D1D1D6]/40 dark:border-[#2D2D2F]/40"
          >
            <FiveDayForecast forecast={forecastData} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
