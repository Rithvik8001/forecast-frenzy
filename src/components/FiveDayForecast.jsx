import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun size={24} className="text-yellow-500" />;
    case "clouds":
      return <Cloud size={24} className="text-gray-400" />;
    case "rain":
      return <CloudRain size={24} className="text-blue-400" />;
    case "snow":
      return <CloudSnow size={24} className="text-blue-200" />;
    case "thunderstorm":
      return <CloudLightning size={24} className="text-yellow-400" />;
    case "mist":
    case "fog":
      return <CloudFog size={24} className="text-gray-300" />;
    default:
      return <Cloud size={24} className="text-gray-400" />;
  }
};

export default function FiveDayForecast({ forecast }) {
  const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden mt-4">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          5-Day Forecast
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="text-center">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {getDayName(day.dt_txt)}
              </p>
              <div className="flex justify-center mb-2">
                {getWeatherIcon(day.weather[0].main)}
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {Math.round(day.main.temp)}°F
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
