import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../model/data';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASE_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=44.4048&longitude=8.9444&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,windspeed_10m';

  dataMeteo: Data[] = [];

  allDataMeteo = new BehaviorSubject(null);
  availableKeys: string[] = [];
  availableData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.BASE_URL).pipe(
      map((res: any) => {
        this.availableKeys = Object.keys(res.hourly);
        this.availableData.next(res.hourly);
        this.parseData(res);
      })
    );
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
    this.availableData.next(res.hourly);
  }
}
