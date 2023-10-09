import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Forecast } from '../model/data';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly BASE_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=44.4048&longitude=8.9444&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,windspeed_10m';

    readonly METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=44.4048&longitude=8.9444&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,windspeed_10m';

  
    dataMeteo: Data[] = [];

  allDataMeteo = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get<any>(this.BASE_URL).subscribe({
      next: (res) => this.parseData(res),
      error: (err) => console.log(err),
    });
  }

  getMeteoData():Observable<Data>{

    return this.http.get<any>(this.BASE_URL).pipe(
      tap(data => console.log(data)),
     
    )

  }

  getMeteoDetails(): Observable<Forecast[]>{
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
        temperatureUnit: data.hourly_units.temperature_2m
      }

      tempArray.push(forecast);
    }


    return tempArray;


    // return data.hourly.time.map((_:any, i:number) => ({
    //     time: new Date(data.hourly.time[i]),
    //     cloudCover: data.hourly.cloudcover[i],
    //     windSpeed: data.hourly.windspeed_10m[i],
    //     precipitation: data.hourly.precipitation_probability[i],
    //     humidity: data.hourly.relativehumidity_2m[i],
    //     temperature: data.hourly.temperature_2m[i],
    //     weatherCode: data.hourly.weathercode[i],
    //     cloudCoverUnit: data.hourly_units.cloudcover,
    //     windSpeedUnit: data.hourly_units.windspeed_10m,
    //     precipitationUnit: data.hourly_units.precipitation_probability,
    //     humidityUnit: data.hourly_units.relativehumidity_2m,
    //     temperatureUnit: data.hourly_units.temperature_2m
    // }))
  }

  fromKmHToKnot(speed: number): number{

    const knot = speed / 1.852;

    const roundedKnot = Math.round(knot)

    return roundedKnot;
  }


  parseData(res: any) {
    const tempData = {
      labels: [],
      datasets: [
        {
          label: 'Temperature',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'Humidity',
          data: [],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    };
  
    for (let i = 0; i < res.hourly.time.length; i++) {
      const time = res.hourly.time[i];
      tempData.labels.push(time);
  
      const temperature = res.hourly.temperature_2m[i];
      const humidity = res.hourly.relativehumidity_2m[i];
  
      tempData.datasets[0].data.push(temperature);
      tempData.datasets[1].data.push(humidity);
    }
  
    this.allDataMeteo.next(tempData);
  }
  
  
}