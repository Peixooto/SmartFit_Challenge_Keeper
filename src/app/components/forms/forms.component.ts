import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit{
  results=[];
  
  constructor(){}


  ngOnInit(): void {
    throw new Error('Error on init formsComponent.');
  }

}
