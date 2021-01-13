import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

  id: string;
  invoice: Invoice;
  subtotal: number = 0;

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']

    this.getInvoice()
  }

  async getInvoice() {
    await this.invoiceService.getInvoiceById(this.id).subscribe((data) => {
      this.invoice = data;
      for (let i = 0; i < this.invoice.lineItems.length; i++) {
        this.subtotal += this.invoice.lineItems[i].subTotal;
      }
    })
  }

}
