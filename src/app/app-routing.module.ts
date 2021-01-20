import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'invoice/add', component:AddInvoiceComponent,canActivate:[AuthGuard]},
  {path:'invoice/:id', component:InvoiceDetailsComponent, canActivate:[AuthGuard]},
  {path:'invoice/edit/:id', component:EditInvoiceComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
