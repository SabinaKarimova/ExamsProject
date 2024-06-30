import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalArrayService } from 'src/app/global-array.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public MatDialogRef: MatDialogRef<NewStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalArrayService: GlobalArrayService
  ) { }
  student!: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }
  onNoClick() {
    this.MatDialogRef.close();
  }
  addStudent(element:any){
    
    if (this.student.invalid) {
      return;
    }
    else{
      
      
      if (this.data.id) {
        let newArray=[]
        newArray.push(this.data)
        this.globalArrayService.updateStudent(newArray, this.student.value);
        this.MatDialogRef.close();

      }
      else{
        this.globalArrayService.pushStudent(this.student.value);
      this.MatDialogRef.close();
      }
      
        }
  }
  createForm() {
    this.student = this.fb.group({
      id: [this.data.id||0],
      no: [{value:this.data.no||'',disabled:this.data.view },Validators.required],
      name: [{value:this.data.name||'',disabled:this.data.view },Validators.required],
      surName: [{value:this.data.surName||'',disabled:this.data.view },Validators.required],
      class: [{value:this.data.class||'',disabled:this.data.view },Validators.required],
    });
  }

}
