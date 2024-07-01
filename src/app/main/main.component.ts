import { Component, OnInit } from '@angular/core';
declare var $: any;


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
    this.collapse()
  }
  collapse() {
    debugger

    $('.hamburger').click(function () {
      debugger
      $('.hamburger').toggleClass('is-active');

    });
    if (window.innerWidth < 768) {
      $('.hamburger').click(function () {
        $('div.head').toggleClass('fullHead');
        $('div.asideMain').toggleClass('asideCol');
        $('.arrow').toggleClass('arrowCol');
        $('div.iconMin').toggleClass('w-70');
        $('div.subIconMin').toggleClass('subIconMinCustom');
        $('div.valueMin').toggleClass('d-none');
        $('.logo').toggleClass('brandLogoCol');
        $('main').toggleClass('collapseMain');
        $('.sideUl').toggleClass('sideUlRes');
        $('.accordionMin').toggleClass('accordionMinToogle');

      });


    }
    else {
      $('.hamburger').click(function () {
        $('div.head').toggleClass('fullHead');
        $('div.asideMain').toggleClass('asideCol');
        $('.arrow').toggleClass('arrowCol');
        $('div.iconMin').toggleClass('w-70');
        $('div.subIconMin').toggleClass('subIconMinCustom');
        $('div.valueMin').toggleClass('d-none');
        $('.logo').toggleClass('brandLogoCol');
        $('main').toggleClass('collapseMain');
        $('.sideUl').toggleClass('sideUlRes');
        $('.accordionMin').toggleClass('accordionMinToogle');

      });
    }
  }
}
