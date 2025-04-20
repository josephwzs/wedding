import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { SignUpComponent } from './common/sign-up/sign-up.component';
import { AboutComponent } from './main/about/about.component';

const routes: Routes = [
{
  path: '',
  pathMatch: 'full',
  redirectTo: '/about',
},
{
  path: "page-not-found",
  component: PageNotFoundComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'signUp',
  component: SignUpComponent
},
{
  path: 'about',
  component: AboutComponent
},
{
  path: 'maintenance',
  loadChildren: () =>
  import('./maintenance/maintenance.module').then(
    (m) => m.MaintenanceModule
  ),
},
{
  path: "**", //any path that is not defined will head to page-not-found screen
  redirectTo: "page-not-found"
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
