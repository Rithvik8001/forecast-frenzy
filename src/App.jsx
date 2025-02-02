import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import FiveDayForecast from "./components/FiveDayForecast";
import { getWeatherData, getFiveDayForecast } from "./utils/api";

export default function Component() {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-400 via-blue-400 to-indigo-500 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-start p-4 sm:p-6 font-sans transition-all duration-300">
      <div className="w-full max-w-lg space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-gray-200/40 dark:border-gray-700/40"
        >
          <div className="p-4 sm:p-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-5 text-gray-900 dark:text-gray-100 tracking-wide">
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
            className="bg-red-100/90 dark:bg-red-900/90 backdrop-blur-lg rounded-3xl shadow-lg overflow-hidden border border-red-200/40 dark:border-red-800/40"
          >
            <p className="p-4 text-red-800 dark:text-red-200 text-sm font-medium">
              {error}
            </p>
          </motion.div>
        )}

        {weatherData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-gray-200/40 dark:border-gray-700/40"
          >
            <WeatherInfo data={weatherData} />
          </motion.div>
        )}

        {forecastData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-gray-200/40 dark:border-gray-700/40"
          >
            <FiveDayForecast forecast={forecastData} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
