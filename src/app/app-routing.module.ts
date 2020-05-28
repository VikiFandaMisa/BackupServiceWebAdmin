import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { HomeComponent } from './components/home/home.component';
import { ComputersComponent } from './components/computers/computers.component';
import { TemplateComponent } from './components/template/template.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LogsComponent } from './components/logs/logs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'computers', component: ComputersComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'jobs', component: JobsComponent},
  { path: 'logs', component: LogsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
