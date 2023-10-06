import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/model/data';
import {Chart} from 'chart.js/auto';
import { ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, registerables} from 'chart.js'
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit{

  dataMeteo?:Data;

  constructor(private data:DataService){}


ngOnInit(): void {
  
  Chart.register(...registerables);
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
  this.getDataMeteo()
  
}

getDataMeteo(){

 
this.data.getData();
  this.data.allDataMeteo.subscribe(res => this.initChart(res))
  
}

initChart(res:any){
  let grapharea = (document.getElementById("myChart")as any).getContext("2d");
if (res !== null) {
  const config = {
    type: 'line',
    data: res,
  };
  let chart = new Chart(grapharea,config)
  console.log('chart',chart)
}
  
  
 





}


}
