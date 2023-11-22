import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeteoService } from 'src/app/services/meteo.service';
import { Meteo, Forecast } from 'src/app/model/data';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit{

  dataMeteo:Meteo

forecastArray: Forecast[] = [];

constructor(private mService: MeteoService){}

ngOnInit(): void {
  this.mService.getMeteoData().subscribe(data => this.forecastArray = data);
}
  
}
