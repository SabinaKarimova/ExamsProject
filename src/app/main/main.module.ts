import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { StudentsComponent } from './students/students.component';
import { NewStudentComponent } from './students/new-student/new-student.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NewSubjectComponent } from './subjects/new-subject/new-subject.component';
import { ExamsComponent } from './exams/exams.component';
import { NewExamComponent } from './exams/new-exam/new-exam.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    StudentsComponent,
    NewStudentComponent,
    SubjectsComponent,
    NewSubjectComponent,
    ExamsComponent,
    NewExamComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
  ]
})
export class MainModule { }
