import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast } from 'src/app/model/data';
import { MeteoService } from 'src/app/services/meteo.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-data-viewer',
  standalone:true,
  imports:[CommonModule,MatButtonModule, MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule],
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent {

  meteoData: Forecast[];
  actualDate = new Date();
  selectedDate: FormGroup;

  constructor(private mService: MeteoService, private fb: FormBuilder) {
    this.selectedDate = this.fb.group({
      start: new Date(),
    });

    this.mService.getMeteoData().subscribe(
      data => this.meteoData = data
    );
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  dateSelected(event: MatDatepickerInputEvent<Date>): void {
    this.selectedDate.setValue({ start: event.value });
  }

}
