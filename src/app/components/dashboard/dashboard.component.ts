import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  invoiceList:Invoice[]
  constructor(private invoiceService:InvoiceService, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices(this.tokenStorageService.getUser()).subscribe((values)=>{
      this.invoiceList = values;
    })
  }

}
