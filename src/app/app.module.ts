import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ExamsComponent } from './exams/exams.component';
import { NewStudentComponent } from './students/new-student/new-student.component';
import { NewSubjectComponent } from './subjects/new-subject/new-subject.component';
import { NewExamComponent } from './exams/new-exam/new-exam.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    SubjectsComponent,
    ExamsComponent,
    NewStudentComponent,
    NewSubjectComponent,
    NewExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
