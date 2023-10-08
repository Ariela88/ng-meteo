import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../model/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=44.4048&longitude=8.9444&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,windspeed_10m';

  dataMeteo: Data[] = [];

  allDataMeteo = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getData(): void {
    this.http.get<any>(this.BASE_URL).subscribe({
      next: (res) => this.parseData(res),
      error: (err) => console.log(err),
    });
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