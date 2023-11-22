import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forecast } from '../model/data';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  readonly METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=44.4048&longitude=8.9444&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,windspeed_10m';

  constructor(private http: HttpClient) {}

  getMeteoData(): Observable<Forecast[]>{
    return this.http.get<any>(this.METEO_URL).pipe(
      map(data => this.createForecastArray(data))
    );
  }

  createForecastArray(data: any): Forecast[]{
    console.log('start create', data);
    const tempArray: Forecast[] = [];

    for (let i = 0; i < data.hourly.time.length; i++) {

      const forecast: Forecast = {
        time: new Date(data.hourly.time[i]),
        cloudCover: data.hourly.cloudcover[i],
        windSpeed: this.fromKmHToKnot(data.hourly.windspeed_10m[i]),
        precipitation: data.hourly.precipitation_probability[i],
        humidity: data.hourly.relativehumidity_2m[i],
        temperature: data.hourly.temperature_2m[i],
        weatherCode: data.hourly.weathercode[i],
        cloudCoverUnit: data.hourly_units.cloudcover,
        windSpeedUnit: 'Kn',
        precipitationUnit: data.hourly_units.precipitation_probability,
        humidityUnit: data.hourly_units.relativehumidity_2m,
        temperatureUnit: data.hourly_units.temperature_2m,
        weatherIcon: this.getWeatherIcon(data.hourly.weathercode[i]),
      }

      tempArray.push(forecast);
    }


    return tempArray;

  }

  getWeatherIcon(weatherCode: number): string {
    switch (weatherCode) {
      case 0:
        return 'assets/sunny.png';
      case 1:
      case 2:
      case 3:
        return 'assets/cloudy.png';
      case 61:
        case 62:
          case 65:
            return 'assets/rainy.png';
                default:
        return 'assets/default.png'; 
    }
  }
  
  

  fromKmHToKnot(speed: number): number{

    const knot = speed / 1.852;

    const roundedKnot = Math.round(knot)

    return roundedKnot;
  }
}
