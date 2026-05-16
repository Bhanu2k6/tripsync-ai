const API_KEY = "b0a597b2faf67a01fa612ce20240e8af";

export const getWeather = async (city) => {

  try {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    };

  } catch (error) {

    console.log(error);

    return null;
  }
};