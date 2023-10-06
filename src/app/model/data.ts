export interface Data {

    
        latitude: number
        longitude: number
        generationtime_ms: number
        utc_offset_seconds: number
        timezone: string
        timezone_abbreviation: string
        elevation: number
        hourly_units: HourlyUnits
        hourly: Hourly
      }
      
      export interface HourlyUnits {
        time: string
        temperature_2m: string
        relativehumidity_2m: string
        precipitation_probability: string
        weathercode: string
        cloudcover: string
        windspeed_10m: string
      }
      
      export interface Hourly {
        time: string[]
        temperature_2m: number[]
        relativehumidity_2m: number[]
        precipitation_probability: number[]
        weathercode: number[]
        cloudcover: number[]
        windspeed_10m: number[]
      }
      

