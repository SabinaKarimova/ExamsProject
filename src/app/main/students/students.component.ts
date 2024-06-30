import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewStudentComponent } from './new-student/new-student.component';
import { GlobalArrayService } from 'src/app/global-array.service';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

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
  exportColumnsMapping: { [key: string]: string } = {
    'no': "No",
    'name': "Adı",
    'surName': "Soyadı",
    'class': "Sinifi"
  };

  ngOnInit(): void {
    this.getStudentArray()
    this.inputs()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this.dataSource.paginator = this.paginator;

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
  
  exportToExcel(data: any[], exportColumnsMapping: { [key: string]: string }, filename: string) {
    const filteredData = data.map(item => {
      const filteredItem: any = {};
      Object.keys(exportColumnsMapping).forEach(columnKey => {
        if (item.hasOwnProperty(columnKey)) {
          const mappedColumnName = exportColumnsMapping[columnKey];
          if (mappedColumnName) {
            filteredItem[mappedColumnName] = item[columnKey];
          }
        }
      });
      return filteredItem;
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    FileSaver.saveAs(blob, filename + '.xlsx');
  }
  excelExport() {

        const data: any[] = this.StudentData
        this.exportToExcel(data, this.exportColumnsMapping,'Students');
      }

}
