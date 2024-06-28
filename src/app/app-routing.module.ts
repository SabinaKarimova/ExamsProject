import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainRoutingModule } from './main/main-routing.module';


const routes: Routes = [
  { path: '', redirectTo: 'modules', pathMatch: 'full' },

  { path: 'modules', component: MainComponent, loadChildren: () => MainRoutingModule },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
