import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  dataMeteo?: Data;
  showTemperature: boolean = true;
  showHumidity: boolean = true;

  constructor(private data: DataService, private cdr: ChangeDetectorRef) {}

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
  toggleTemperature() {
    this.showTemperature = !this.showTemperature;
    this.cdr.detectChanges();
  }

  toggleHumidity() {
    this.showHumidity = !this.showHumidity;
    this.cdr.detectChanges();
  }

  getDataMeteo() {
    this.data.getData();
    this.data.allDataMeteo.subscribe((res) => this.initChart(res));
  }

  initChart(res: any) {
    console.log('initChart called');
    let grapharea = (
      document.getElementById('myChart') as HTMLCanvasElement
    ).getContext('2d');

    if (res !== null) {
      const labels = res.labels;
      const datasets = [];

      if (this.showTemperature) {
        datasets.push({
          label: 'Temperature',
          data: res.datasets[0].data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
        });
      }

      if (this.showHumidity) {
        datasets.push({
          label: 'Humidity',
          data: res.datasets[1].data,
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
        });
      }

      const config: ChartConfiguration = {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
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
      console.log('chart', chart);
      console.log('showTemperature:', this.showTemperature);
      console.log('showHumidity:', this.showHumidity);
    }
  }
}
