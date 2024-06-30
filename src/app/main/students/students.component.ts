import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewStudentComponent } from './new-student/new-student.component';
import { GlobalArrayService } from 'src/app/global-array.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private globalArrayService: GlobalArrayService
  ) { }
  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  StudentData: any[] = [  ]
  filterForm!: FormGroup;
  displayedColumns: string[] = ['operation','no', 'name','surName','class'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.StudentData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onChangePage(pe: PageEvent) {

  }

  ngOnInit(): void {
    this.getStudentArray()
    this.inputs()
  }
  inputs() {
    this.filterForm = this.formBuilder.group(
      {
        no: [''],
        name: [''],
        surName: [''],
        class: ['']
      }
    )
  }
  addElement(element: any): void {
    this.globalArrayService.pushStudent(element);
  }

  getStudentArray() {
  
    this.StudentData= this.globalArrayService.getStudent();
    this.length=this.StudentData.length
    this.dataSource= new MatTableDataSource<any>(this.StudentData);
  }
  handleFilter() {

  }
  deleteStudent(index:number){

    this.StudentData.splice(index,1);
    this.getStudentArray()
  }
  handleKeyUp(e: any) {

    if (e.keyCode === 13||e.keyCode===9) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  openDialog(id?:number,no?:number,name?:any,surName?:any,className?:number,view?:boolean) {

    const dialogRef = this.dialog.open(NewStudentComponent, {
      width:"435px!important",
      data: {id:id,no:no,name:name,surName:surName,class:className,view:view},
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getStudentArray()
    });
  }
}
