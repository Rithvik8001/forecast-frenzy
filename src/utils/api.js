const API_KEY = "795dd44581136a7bd7e33ca85edba47c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherData(location) {
  const response = await fetch(
    `${BASE_URL}/weather?q=${location}&units=imperial&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Weather data not found");
  return response.json();
}

export async function getFiveDayForecast(location) {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${location}&units=imperial&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Forecast data not found");
  const data = await response.json();
  // Filter to get one forecast per day
  const dailyData = data.list.filter((reading, index) => index % 8 === 0);
  return dailyData.slice(0, 5); // Return only the first 5 days
}

export async function getCitySuggestions(input) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch city suggestions");
  const data = await response.json();
  return data.map((city) => `${city.name}, ${city.country}`);
}
