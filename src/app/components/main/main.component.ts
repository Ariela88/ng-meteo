import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/model/data';
import { Chart } from 'chart.js/auto';
import {
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  registerables,
} from 'chart.js';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  dataMeteo?: Data;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    this.getDataMeteo();
  }

  getDataMeteo() {
    this.data.getData();
    this.data.allDataMeteo.subscribe((res) => this.initChart(res));
  }

  initChart(res: any) {
    console.log(res);
    let grapharea = (
      document.getElementById('myChart') as HTMLCanvasElement
    ).getContext('2d');

    if (res !== null) {
      const labels = res.labels;
      const data = res.datasets[0].data;

      const temperatureData = res.datasets[0].data;
      const humidityData = res.datasets[1].data;

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatureData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
            },
            {
              label: 'Humidity',
              data: humidityData,
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
            },
          ],
        },
        options: {
          animations: {
            tension: {
              duration: 1000,
              easing: 'linear',
              from: 1,
              to: 0,
              loop: true,
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
            },
          },
        },
      };
      let chart = new Chart(grapharea, config);
    }
  }
}
