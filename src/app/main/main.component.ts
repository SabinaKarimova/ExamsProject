import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  menuValue:any[]=[
    {id:1,value:'Dərslər',link:'subject',icon:'fa-solid fa-book'},
    {id:2,value:'Şagirdlər',link:'student',icon:'fa-regular fa-user'},
    {id:3,value:'İmtahanlar',link:'exams',icon:'fa-regular fa-pen-to-square'},

  ]

  ngOnInit(): void {
  }

}
