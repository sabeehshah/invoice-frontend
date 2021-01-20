import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
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

  constructor(private invoiceService: InvoiceService, private router: Router, private route: ActivatedRoute, private snackbar:MatSnackBar) {
    this.id = this.route.snapshot.params['id']
     this.invoiceService.getInvoiceById(this.id).subscribe((data) => {
      this.invoice = data;
      for (let i = 0; i < this.invoice.lineItems.length; i++) {
        this.subtotal += this.invoice.lineItems[i].subTotal;
      }
    })

   }

  ngOnInit(): void {

  }

 
  deleteInvoice(){
    const result = confirm("Are you sure you want to delete the invoice?")
    if(result){
      this.invoiceService.deleteInvoiceById(this.id).subscribe((data)=>{
        
      })
      this.router.navigate(['/dashboard']).then((navigated:boolean)=>{
        if(navigated){
          this.snackbar.open('Invoice Deleted', 'close',{duration:10000});
        }else{
          this.snackbar.open('Something went wrong!','close',{duration:10000})
        }
      });
    }
  }

}
