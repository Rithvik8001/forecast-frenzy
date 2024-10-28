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
  const iconSize = 20;
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun size={iconSize} className="text-yellow-500" />;
    case "clouds":
      return <Cloud size={iconSize} className="text-gray-400" />;
    case "rain":
      return <CloudRain size={iconSize} className="text-blue-400" />;
    case "snow":
      return <CloudSnow size={iconSize} className="text-blue-200" />;
    case "thunderstorm":
      return <CloudLightning size={iconSize} className="text-yellow-400" />;
    case "mist":
    case "fog":
      return <CloudFog size={iconSize} className="text-gray-300" />;
    default:
      return <Cloud size={iconSize} className="text-gray-400" />;
  }
};

export default function FiveDayForecast({ forecast }) {
  const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        5-Day Forecast
      </h2>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">
              {getDayName(day.dt_txt)}
            </p>
            <div className="flex justify-center mb-1 sm:mb-2">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
              {Math.round(day.main.temp)}°F
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
