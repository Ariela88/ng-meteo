import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { GraphicComponent } from './components/graphic/graphic.component';

const routes: Routes = [

  {path: 'home', component: MainComponent},
  {path: '', component: MainComponent},
  {path: 'graphic', component: GraphicComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
