import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice';
import { LineItem } from '../models/LineItem';
import { catchError, map } from 'rxjs/operators';


const base_URL = environment.baseUrl;
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(private httpClient: HttpClient) {
    
  }

  getInvoices(createdBy: string): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(base_URL + `api/invoices/createdBy/${createdBy}`)

  }

  getInvoiceById(id:string):Observable<Invoice>{
    return this.httpClient.get<Invoice>(base_URL + `api/invoices/${id}`)
  }

  createNewInvoice(invoice:Invoice):Observable<any>{
    return this.httpClient.post<Invoice>(base_URL + `api/invoices`, invoice)
  }

 

}
