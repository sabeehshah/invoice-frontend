import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'invoice/add', component:AddInvoiceComponent,canActivate:[AuthGuard]},
  {path:'invoice/:id', component:InvoiceDetailsComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
