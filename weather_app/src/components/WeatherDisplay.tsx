import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: 4,
    minWidth: "800px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  inputField: {
    marginBottom: 2,
  },
  weatherInfo: {
    display:"flex",
    flexDirection:"column",
    gap:"1rem",
    marginTop: 2,
  },
  weatherTitle: {
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 2,
  },
  weatherButton: {
    marginTop: 2,
  },
  headerBox: {
    display: "flex",
    // flexDirection: "column",
    padding:"3rem",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },
}));

const WeatherDisplay: React.FC = () => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string>("");

  const getCurrentLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchWeatherByCity = async () => {
    try {
      const apiKey = "5505d6f215d8ecc7094519423369dda6";
      const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    const fetchWeatherByLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        const apiKey = "5505d6f215d8ecc7094519423369dda6";
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        setWeatherData(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Error fetching weather data");
        setWeatherData(null);
      }
    };

    fetchWeatherByLocation();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Weather Information
      </Typography>
      <div className={classes.headerBox}>
        <TextField
          className={classes.inputField}
          label="City Name"
          variant="outlined"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.weatherButton}
          onClick={fetchWeatherByCity}
        >
          Get Weather
        </Button>
      </div>
      {weatherData && (
        <div className={classes.weatherInfo}>
          <Typography variant="h5" className={classes.weatherTitle}>
          Showing  Weather in {weatherData.name}
          </Typography>
          <Typography>Latitude: {weatherData.coord.lat}</Typography>
          <Typography>Longitude: {weatherData.coord.lon}</Typography>
          <Typography>Weather: {weatherData.weather[0].main}</Typography>
          <Typography>Wind speed: {weatherData.wind.speed}</Typography>

        </div>
      )}

      {error && (
        <Typography className={classes.errorMessage} variant="subtitle1">
          {error}
        </Typography>
      )}
    </Paper>
  );
};

export default WeatherDisplay;
