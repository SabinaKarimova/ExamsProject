import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalArrayService } from 'src/app/global-array.service';
import { NewSubjectComponent } from './new-subject/new-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private globalArrayService: GlobalArrayService
  ) { }

  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  SubjectData: any[] = []
  filterForm!: FormGroup;
  displayedColumns: string[] = ['operation','code', 'name','class','teacherName','teacherSurName'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.SubjectData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onChangePage(pe: PageEvent) {
  }

  ngOnInit(): void {
    this.getSubjectArray()
    this.inputs()
  }
  inputs() {
    this.filterForm = this.formBuilder.group(
      {
        code: [''],
        name: [''],
        class: [''],
        teacherName: [''],
        teacherSurName: [''],
      }
    )
  }
  addElement(element: any): void {
    this.globalArrayService.pushSubject(element);
  }
  handleFilter() {

  }
  getSubjectArray() {

    this.SubjectData= this.globalArrayService.getSubject();
    this.length=this.SubjectData.length
    this.dataSource= new MatTableDataSource<any>(this.SubjectData);
  }
 
  deleteSubject(index:number){

    this.SubjectData.splice(index,1);
    this.getSubjectArray()
  }
  handleKeyUp(e: any) {

    if (e.keyCode === 13||e.keyCode===9) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  openDialog(id?:number,code?:string,name?:string,className?:number,teacherName?:string,teacherSurName?:string,view?:boolean) {

    const dialogRef = this.dialog.open(NewSubjectComponent, {
      width:"435px!important",
      data: {id:id,code:code,name:name,class:className,teacherName:teacherName,teacherSurName:teacherSurName,view:view},
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getSubjectArray()
    });
  }
}
