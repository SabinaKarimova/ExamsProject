import { Component, OnInit, ViewChild } from '@angular/core';
import { NewExamComponent } from './new-exam/new-exam.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GlobalArrayService } from 'src/app/global-array.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

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
  exportColumnsMapping: { [key: string]: string } = {
    'code': "Dərsin kodu",
    'no': "Şagird No",
    'date': "İmtahan tarixi",
    'point': "Qiyməti"
  };

  onChangePage(pe: PageEvent) {

  }

  ngOnInit(): void {
    this.getExamArray()
    this.inputs()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    
    this.ExamData= this.globalArrayService.getExam();
    this.length=this.ExamData.length
    this.dataSource= new MatTableDataSource<any>(this.ExamData);
    this.dataSource.paginator = this.paginator;

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

        const data: any[] = this.ExamData
        this.exportToExcel(data, this.exportColumnsMapping,'Exams');
      }
}
