import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/Invoice';
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

  getInvoiceById(id: string): Observable<Invoice> {
    return this.httpClient.get<Invoice>(base_URL + `api/invoices/${id}`)
  }

  createNewInvoice(invoice: Invoice): Observable<any> {
    return this.httpClient.post<Invoice>(base_URL + `api/invoices`, invoice)
  }

  updateInvoiceById(id: string, invoice: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(base_URL + `api/invoices/${id}`, invoice)
  }

  deleteInvoiceById(id:string):Observable<any>{
    return this.httpClient.delete(base_URL + `api/invoices/${id}`)
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
