import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {



  invoiceList: Invoice[]

  displayedColumns: string[] = ['invoiceFrom', 'invoiceTo', 'address', 'issueDate', 'dueDate', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private invoiceService: InvoiceService, private tokenStorageService: TokenStorageService, private router:Router) {

  }

  ngOnInit(): void {
    
    this.getInvoices();
  }

  ngAfterViewInit() {

  }

  async getInvoices() {
    await this.invoiceService.getInvoices(this.tokenStorageService.getUser()).subscribe((values) => {
      this.invoiceList = values;
      this.dataSource = new MatTableDataSource(this.invoiceList);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToDetails(invoice){
    this.router.navigate([`/invoice/${invoice.id}`])
    
  }


}
