import { Component, OnInit, ViewChild } from '@angular/core';
import { NewExamComponent } from './new-exam/new-exam.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalArrayService } from 'src/app/global-array.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

 
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private globalArrayService: GlobalArrayService
  ) { }
  length!: number
  pageSize!: number;
  pageSizeOptions: number[] = [10, 20, 50];
  ExamData: any[] = [  ]
  filterForm!: FormGroup;
  displayedColumns: string[] = ['operation','code', 'no','date','point'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.ExamData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onChangePage(pe: PageEvent) {

  }

  ngOnInit(): void {
    this.getExamArray()
    this.inputs()
  }
  inputs() {
    this.filterForm = this.formBuilder.group(
      {
        code: [''],
        no: [''],
        date: [''],
        point: ['']
      }
    )
  }
  addElement(element: any): void {
    this.globalArrayService.pushExam(element);
  }

  getExamArray() {
    debugger
    this.ExamData= this.globalArrayService.getExam();
    this.length=this.ExamData.length
    this.dataSource= new MatTableDataSource<any>(this.ExamData);
  }
  handleFilter() {

  }
  deleteExam(index:number){

    this.ExamData.splice(index,1);
    this.getExamArray()
  }
  handleKeyUp(e: any) {

    if (e.keyCode === 13||e.keyCode===9) {
    const filterValue = (e.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  openDialog(id?:number,code?:string,no?:number,date?:any,point?:number,view?:boolean) {

    const dialogRef = this.dialog.open(NewExamComponent, {
      width:"435px!important",
      data: {id:id,code:code,no:no,date:date,point:point,view:view},
      disableClose:true
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getExamArray()
    });
  }
}
