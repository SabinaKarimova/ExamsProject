import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NewStudentComponent } from './students/new-student/new-student.component';
import { NewExamComponent } from './exams/new-exam/new-exam.component';
import { NewSubjectComponent } from './subjects/new-subject/new-subject.component';

const routes: Routes = [
  { path: '', redirectTo: 'student', pathMatch: 'full' },
  { path: 'student', component: StudentsComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'subject', component: SubjectsComponent },
  { path: 'student/newStudent', component: NewStudentComponent },
  { path: 'exams/newExam', component: NewExamComponent },
  { path: 'subject/newSubject', component: NewSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
