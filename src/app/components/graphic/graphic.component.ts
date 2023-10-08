import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/model/data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit{

  dataMeteo:Data
constructor(private data:DataService){}


ngOnInit(): void {
 this.getDataMeteo()
  
}



getDataMeteo():void {
  this.data.getMeteoData().subscribe(
    res => {
      this.dataMeteo = res;
      console.log(res);
    },
    error => {
      console.error('Errore durante il recupero dei dati:', error);
    }
  );
}
  
}
