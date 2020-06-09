import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaComponent } from './sa/sa.component';
import { NaComponent } from './na/na.component';
import { EuComponent } from './eu/eu.component';

const routes: Routes = [
  { path: 'sa', component: SaComponent },
  { path: 'na', component: NaComponent },
  { path: 'eu', component: EuComponent },
  { path: '', redirectTo: '/sa', pathMatch: 'full' },
  { path: '**', redirectTo: '/sa', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
