import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalArrayService {
  private StudentData: any[] = [
    {id:1,no:12345,name:'Sabina',surName:'Karimova',class:11}
  ]
  private SubjectData: any[] = [
    {id:1,code:123,name:'Riyaziyyat',class:11,teacherName:'Kəmalə',teacherSurName:'Məmmədova'}
  ]
  private ExamData: any[] = [
    {id:1,code:'123',no:12345,date:'24-06-20224',point:4}
  ]
  constructor() { }
  getStudent(): any[] {
    for (let index = 0; index < this.StudentData.length; index++) {
      this.StudentData[index].id=index+1     
    }
    return this.StudentData;
  }

  pushStudent(element: any): void {
    this.StudentData.push(element);
  }
  update:boolean=false
  updateStudent(oldElement: any, newElement: any): any {
    debugger
    for (let index = 0; index < this.StudentData.length; index++) {
      if (this.StudentData[index].id ==newElement.id) {
        this.StudentData[index] = newElement;
        this.update=true
      } 
      
    }
    if (!this.update) {
        this.StudentData.push(newElement);
      
    }
  }
  deleteStudent(index:number){
    debugger
    this.StudentData.splice(index,1);

  }
  getSubject(): any[] {
    for (let index = 0; index < this.SubjectData.length; index++) {
      this.SubjectData[index].id=index+1     
    }
    return this.SubjectData;
  }

  pushSubject(element: any): void {
    this.SubjectData.push(element);
  }
  updateSub:boolean=false
  updateSubject(oldElement: any, newElement: any): any {
    debugger
    for (let index = 0; index < this.SubjectData.length; index++) {
      if (this.SubjectData[index].id ==newElement.id) {
        this.SubjectData[index] = newElement;
        this.updateSub=true
      } 
      
    }
    if (!this.updateSub) {
        this.SubjectData.push(newElement);
      
    }
  }
  deleteSubject(index:number){
    debugger
    this.SubjectData.splice(index,1);

  }
  
  getExam(): any[] {
    for (let index = 0; index < this.ExamData.length; index++) {
      this.ExamData[index].id=index+1     
    }
    return this.ExamData;
  }

  pushExam(element: any): void {
    this.ExamData.push(element);
  }
  updateExams:boolean=false
  updateExam(oldElement: any, newElement: any): any {
    debugger
    for (let index = 0; index < this.ExamData.length; index++) {
      if (this.ExamData[index].id ==newElement.id) {
        this.ExamData[index] = newElement;
        this.updateExams=true
      } 
      
    }
    if (!this.updateExams) {
        this.ExamData.push(newElement);
      
    }
  }
  deleteExam(index:number){
    debugger
    this.ExamData.splice(index,1);

  }
}
