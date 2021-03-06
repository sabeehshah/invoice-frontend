import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import {ReactiveFormsModule} from '@angular/forms'

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { InvoiceService } from './services/invoice.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { from } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';


import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    InvoiceDetailsComponent,
    AddInvoiceComponent,
    EditInvoiceComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    GooglePlaceModule
  ],
  providers: [AuthService,CookieService,InvoiceService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
