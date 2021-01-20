import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {



  invoiceList: Invoice[]

  invoicesIssuedByMonth: number[];

  displayedColumns: string[] = ['invoiceFrom', 'invoiceTo', 'address', 'issueDate', 'dueDate', 'total', 'actions'];
  dataSource: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private invoiceService: InvoiceService, private tokenStorageService: TokenStorageService, private router: Router) {

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

        this.invoicesIssuedByMonth = this.countInvoicesIssuedByMonth();
    this.displayInvoiceCountByMonthChart();
  
    });

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigateToDetails(invoice) {
    this.router.navigate([`/invoice/${invoice.id}`])

  }

  countInvoicesIssuedByMonth(): number[] {
    // Create array of 12 items init'd at 0
    // increment the count of each month
    const monthCountArr = new Array(12).fill(0);
    this.invoiceList.forEach(({ issueDate }) => monthCountArr[new Date(issueDate).getMonth()] += 1);
    console.log(monthCountArr);
    return monthCountArr;
  }

  displayInvoiceCountByMonthChart() {

    var ctx = document.getElementById('myChart'); // node
    const arr = this.countInvoicesIssuedByMonth();

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: '# of Invoices Issued By Month',
          data: arr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'

          ],
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              precision:0
            }
          }]
        },
        responsive:true
      }
    });
  }


}
