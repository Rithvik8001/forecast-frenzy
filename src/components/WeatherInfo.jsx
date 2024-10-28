// components/WeatherInfo.js
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
      return <Sun size={48} className="text-[#FF9500]" />;
    case "clouds":
      return <Cloud size={48} className="text-[#8E8E93]" />;
    case "rain":
      return <CloudRain size={48} className="text-[#007AFF]" />;
    case "snow":
      return <CloudSnow size={48} className="text-[#64D2FF]" />;
    case "thunderstorm":
      return <CloudLightning size={48} className="text-[#FF9F0A]" />;
    case "mist":
    case "fog":
      return <CloudFog size={48} className="text-[#8E8E93]" />;
    default:
      return <Cloud size={48} className="text-[#8E8E93]" />;
  }
};

export default function WeatherInfo({ data }) {
  const { main, weather, wind } = data;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#1D1D1F] dark:text-white">
          {data.name}
        </h2>
        {getWeatherIcon(weather[0].main)}
      </div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <p className="text-5xl font-thin text-[#1D1D1F] dark:text-white">
            {Math.round(main.temp)}°F
          </p>
          <p className="text-lg text-[#6E6E73] dark:text-[#98989D] capitalize">
            {weather[0].description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#6E6E73] dark:text-[#98989D]">
            H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl p-3">
          <p className="text-[#6E6E73] dark:text-[#98989D]">Humidity</p>
          <p className="font-semibold text-[#1D1D1F] dark:text-white">
            {main.humidity}%
          </p>
        </div>
        <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl p-3">
          <p className="text-[#6E6E73] dark:text-[#98989D]">Wind</p>
          <p className="font-semibold text-[#1D1D1F] dark:text-white">
            {Math.round(wind.speed)} mph
          </p>
        </div>
        <div className="bg-[#F5F5F7] dark:bg-[#2C2C2E] rounded-xl p-3">
          <p className="text-[#6E6E73] dark:text-[#98989D]">Feels like</p>
          <p className="font-semibold text-[#1D1D1F] dark:text-white">
            {Math.round(main.feels_like)}°F
          </p>
        </div>
      </div>
    </div>
  );
}
