import axios from "axios";

const API_KEY = "5f025f1dd4af30e0b94f2341cd21c7d5";


const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY, 
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    throw error;
  }
}

