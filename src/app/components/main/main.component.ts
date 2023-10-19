import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MeteoService } from 'src/app/services/meteo.service';
import { Forecast, Meteo } from 'src/app/model/data';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private mService: MeteoService) {}

  ngOnInit(): void {
    this.mService.getMeteoData().subscribe((data) => {
      this.initChart(data);
    });
  }

  initChart(data: Forecast[]) {

    const ctx:any = document.getElementById('myChart');

    const chart:any = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(forecast => forecast.time.toISOString()),
        datasets: [
          {
            label: 'precipitation probability',
            data: data.map(forecast => forecast.precipitation),
            borderWidth: 1,
          },
          {
            label: 'humidity',
            data: data.map(forecast => forecast.humidity),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: '%'
            },
          },
        },
      },
    });

    chart.canvas.parentNode.style.height = '500px';

  }
}
