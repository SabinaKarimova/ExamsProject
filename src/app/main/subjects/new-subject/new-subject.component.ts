import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalArrayService } from 'src/app/global-array.service';

@Component({
  selector: 'app-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.scss']
})
export class NewSubjectComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public MatDialogRef: MatDialogRef<NewSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private globalArrayService: GlobalArrayService
  ) { }
  subject!: FormGroup;
  ngOnInit(): void {
    this.createForm()
  }
  onNoClick() {
    this.MatDialogRef.close();
  }
  addSubject(){
    debugger
    if (this.subject.invalid) {
      return;
    }
    else{
      debugger
      debugger
      if (this.data.id) {
        let newArray=[]
        newArray.push(this.data)
        this.globalArrayService.updateSubject(newArray, this.subject.value);
        this.MatDialogRef.close();

      }
      else{
        this.globalArrayService.pushSubject(this.subject.value);
      this.MatDialogRef.close();
      }
      
        }
  }
  createForm() {
    this.subject = this.fb.group({
      id: [this.data.id||0],
      code: [{value:this.data.code||'',disabled:this.data.view },Validators.required],
      name: [{value:this.data.name||'',disabled:this.data.view },Validators.required],
      teacherName: [{value:this.data.teacherName||'',disabled:this.data.view },Validators.required],
      class: [{value:this.data.class||'',disabled:this.data.view },Validators.required],
      teacherSurName: [{value:this.data.teacherSurName||'',disabled:this.data.view },Validators.required],

    });
  }

}

