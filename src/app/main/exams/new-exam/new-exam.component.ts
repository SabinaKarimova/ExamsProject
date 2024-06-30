import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalArrayService } from 'src/app/global-array.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public MatDialogRef: MatDialogRef<NewExamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalArrayService: GlobalArrayService
  ) { }
  exam!: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }
  onNoClick() {
    this.MatDialogRef.close();
  }
  addexam(element:any){
    
    if (this.exam.invalid) {
      return;
    }
    else{
      
      
      if (this.data.id) {
        let newArray=[]
        newArray.push(this.data)
        this.exam.value.date= formatDate(this.exam.value.date, 'dd-MM-yyyy', "en-US")
        this.globalArrayService.updateExam(newArray, this.exam.value);
        this.MatDialogRef.close();

      }
      else{
        this.exam.value.date= formatDate(this.exam.value.date, 'dd-MM-yyyy', "en-US")

        this.globalArrayService.pushExam(this.exam.value);
      this.MatDialogRef.close();
      }
      
        }
  }
  createForm() {
    this.exam = this.fb.group({
      id: [this.data.id||0],
      code: [{value:this.data.code||'',disabled:this.data.view },Validators.required],
      no: [{value:this.data.no||'',disabled:this.data.view },Validators.required],
      date: [{value: this.parseDateString(this.data.date) ||formatDate(new Date(), 'yyyy-MM-dd', "en-US") ||'',disabled:this.data.view },Validators.required],
      point: [{value:this.data.point||'',disabled:this.data.view },Validators.required],
    });
  }
  parseDateString(dateString: string): Date | null {
    if (!dateString) return null;
    const dateParts = dateString.split('-');
    if (dateParts.length !== 3) return null;
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript Date
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }
}
