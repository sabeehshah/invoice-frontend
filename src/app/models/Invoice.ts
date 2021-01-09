import { LineItem } from "./LineItem"

export interface Invoice {
    id:string,
    createdBy:string,
    invoiceFrom:string,
    invoiceTo:string,
    address:string,
    dueDate:string,
    issueDate:string,
    taxAmtPercentage:number,
    taxAmtValue:number,
    total:number,
    lineItems:LineItem[]
}

