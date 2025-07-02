import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '../../types/location.interface';

const OPENING_HOURS={
  morning:{
    first:'06',
    last:'12'
  },
   afternoon:{
    first:'12',
    last:'18'
  },
   night:{
    first:'18',
    last:'23'
   }
}

type HOUR_INDEXES = 'morning'|'afternoon' | 'night'
@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
  results: Location[]= [];
  filteredResults: Location[] = [];

  formGroup!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService){}


  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations
    })
    this.formGroup = this.formBuilder.group({
      hour:'',
      showClosed: true
    })
  }

  transformWeekday(weekday:number){
    switch (weekday){
      case 0:
        return 'Dom.'
    
    case 6:
      return 'Sáb.'

    default:
      return 'Seg. à Sex.'
    }
  }

  filterUnits(unit:Location,opened:boolean,open_hour:string,close_hour:string){
    let open_hour_filter = parseInt(open_hour,10)
    let close_hour_filter = parseInt(close_hour,10)

    let todays_weekday =  this.transformWeekday (new Date().getDay());

    for(let i = 0; i< unit.schedules.length; i++){
      let schedules_hour = unit.schedules[i].hour
      let schedules_weekday = unit.schedules[i].weekdays
    }    
  }

  onSubmit():void {
    const OPEN_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first
    const CLOSE_HOUR = OPENING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last

   if (!this.formGroup.value.showClosed){
    this.filteredResults = this.results.filter(location => location.opened === true)
   } else {
    this.filteredResults = this.results
   }
  }

  onClean():void {
    this.formGroup.reset();
  }

}
