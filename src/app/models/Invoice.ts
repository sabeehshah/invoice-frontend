import { Address } from "./Address";
import { LineItem } from "./LineItem"

export interface Invoice {
    id:string,
    createdBy:string,
    invoiceFrom:string,
    invoiceTo:string,
    companyPhone:string,
    companyAddress:Address,
    billingAddress:Address,
    dueDate:string,
    issueDate:string,
    taxAmtPercentage:number,
    taxAmtValue:number,
    total:number,
    lineItems:LineItem[]
}

