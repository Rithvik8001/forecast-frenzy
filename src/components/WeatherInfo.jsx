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
  const iconSize = 36;
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun size={iconSize} className="text-yellow-500" />;
    case "clouds":
      return <Cloud size={iconSize} className="text-gray-400" />;
    case "rain":
      return <CloudRain size={iconSize} className="text-blue-500" />;
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

export default function WeatherInfo({ data }) {
  const { main, weather, wind } = data;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {data.name}
        </h2>
        {getWeatherIcon(weather[0].main)}
      </div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-4xl sm:text-5xl font-thin text-gray-900 dark:text-gray-100">
            {Math.round(main.temp)}°F
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 capitalize">
            {weather[0].description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 sm:p-3">
          <p className="text-gray-600 dark:text-gray-400">Humidity</p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {main.humidity}%
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 sm:p-3">
          <p className="text-gray-600 dark:text-gray-400">Wind</p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(wind.speed)} mph
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-2 sm:p-3">
          <p className="text-gray-600 dark:text-gray-400">Feels like</p>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(main.feels_like)}°F
          </p>
        </div>
      </div>
    </div>
  );
}
