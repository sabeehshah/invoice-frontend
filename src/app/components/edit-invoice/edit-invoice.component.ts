import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit {

  id:string;
  invoice:Invoice
  invoiceForm:FormGroup

  //form state
  loading = false
  success = false

  lineItemValueChanges;
  totalSum: number = 0;

  taxAmtValueChanges;
  taxAmtValue: number = 0;

  options = {
    componentRestrictions: {
      country: ["CA"]
    }
  }



  constructor(private fb:FormBuilder, private invoiceService:InvoiceService,
   private snackbar:MatSnackBar, private tokenService:TokenStorageService, private router:Router, private route:ActivatedRoute ) { 
    this.id = this.route.snapshot.params['id']

   }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceFrom: ['', Validators.required],
      invoiceTo: ['', Validators.required],
      companyAddress: ['', Validators.required],
      billingAddress: ['', Validators.required],
      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      companyPhone: ['', Validators.required],
      taxAmtPercentage: ['', Validators.required],
      lineItems: this.fb.array([])
    })

    this.id = this.route.snapshot.params['id']

    this.lineItemValueChanges = this.invoiceForm.controls['lineItems'].valueChanges;
    this.lineItemValueChanges.subscribe(items => this.updateLineItemSubtotal(items));



    this.getAndUpdateInvoiceUI();
  }

  get lineItemForms() {
    return this.invoiceForm.get('lineItems') as FormArray
  }

  get issueDate() {
    return this.invoiceForm.get('issueDate');
  }

  get dueDate() {
    return this.invoiceForm.get('dueDate');
  }

  get invoiceFrom() {
    return this.invoiceForm.get('invoiceFrom');
  }

  get invoiceTo() {
    return this.invoiceForm.get('invoiceTo');
  }

  get companyPhone() {
    return this.invoiceForm.get('companyPhone');
  }

  get taxAmtPercentage() {
    return this.invoiceForm.get('taxAmtPercentage');
  }

  get companyAddress() {
    return this.invoiceForm.get('companyAddress');
  }

  get billingAddress() {
    return this.invoiceForm.get('billingAddress');
  }


  addLineItem() {
    const lineItem = this.fb.group({
      itemName: ['', Validators.required],
      itemQty: [0, Validators.required],
      itemPrice: [0, Validators.required],
      subTotal: [{ value: 0, disabled: true }]
    })

    this.lineItemForms.push(lineItem);
    // console.log(this.lineItemForms.controls)
  }

  deleteLineItem(i) {
    this.lineItemForms.removeAt(i);
  }

  CompanyAddressChange(address: any) {

    this.invoiceForm.get('companyAddress').setValue(address.formatted_address);

  }

  BillingAddressChange(address: any) {

    this.invoiceForm.get('billingAddress').setValue(address.formatted_address);


  }

  private updateLineItemSubtotal(items: any) {
    const control = <FormArray>this.invoiceForm.controls['lineItems'];
    this.totalSum = 0
    for (let i in items) {
      let subtotal = (items[i].itemQty * items[i].itemPrice).toFixed(2);
      control.at(+i).get('subTotal').setValue(parseFloat(subtotal), { onlySelf: true, emitEvent: false });
      this.totalSum += parseFloat(subtotal);
    }


  }

  calculateTaxAmountVal():number{
    return parseFloat(((this.invoiceForm.controls['taxAmtPercentage'].value / 100) * this.totalSum).toFixed(2));
  }

  calculateTotalWithTax():number{
    return this.calculateTaxAmountVal() + this.totalSum;
  }

  async getAndUpdateInvoiceUI(){
    try {
      await this.invoiceService.getInvoiceById(this.id).subscribe((invoice)=>{
        this.invoice = invoice

        this.invoiceForm.patchValue(this.invoice);
        this.invoice.lineItems.forEach((item)=>{
          const lineItem = this.fb.group({
            itemName:[item.itemName,Validators.required],
            itemQty:[item.itemQty,Validators.required],
            itemPrice:[item.itemPrice,Validators.required],
            subTotal:[{ value: item.subTotal, disabled: true }]
          });

          this.lineItemForms.push(lineItem)
        })

      })
    } catch (error) {
      console.log(error)
    }
  }

  async submitHandler(){
    this.loading = true;

    try {

      let formObj = this.invoiceForm.getRawValue();
      formObj.taxAmtValue = this.calculateTaxAmountVal();
      formObj.total = this.calculateTotalWithTax().toFixed(2);
      formObj.createdBy = this.tokenService.getUser()
      let serializedForm = JSON.stringify(formObj)
      // console.log(serializedForm)

      let invoice: Invoice = JSON.parse(serializedForm);

      await this.invoiceService.updateInvoiceById(this.id,invoice).subscribe(invoice_ =>{
        // console.log(invoice_);

        this.router.navigate([`/invoice/${this.id}`]).then((navigated:boolean)=>{
          if(navigated){
            this.snackbar.open('Invoice Updated', 'close',{duration:10000});
          }else{
            this.snackbar.open('Something went wrong!','close',{duration:10000})
          }
        });
      });

      
    } catch (error) {
      
    }
  }



}
