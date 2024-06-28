import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  menuValue:any[]=[
    {id:1,value:'Tələbələr',link:'student',icon:''},
    {id:2,value:'Dərslər',link:'subject',icon:''},
    {id:3,value:'İmtahanlar',link:'exams',icon:''},

  ]

  ngOnInit(): void {
  }

}
