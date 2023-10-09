export interface Data {

    
        latitude: number
        longitude: number
        generationtime_ms: number
        utc_offset_seconds: number
        timezone: string
        timezone_abbreviation: string
        elevation: number
        hourly_units: Forecast
        hourly: Hourly
      }
      
      export interface Forecast {
        time: Date;
        temperature: number;
        humidity: number;
        precipitation: number;
        cloudCover: number;
        windSpeed: number;
        weatherCode: number;
        temperatureUnit: string;
        humidityUnit: string;
        precipitationUnit: string;
        cloudCoverUnit: string;
        windSpeedUnit: string;
      }
      export interface Hourly {
        [key: string]: any;
        time: string[]
        temperature_2m: number[]
        relativehumidity_2m: number[]
        precipitation_probability: number[]
        weathercode: number[]
        cloudcover: number[]
        windspeed_10m: number[]
      }
      

