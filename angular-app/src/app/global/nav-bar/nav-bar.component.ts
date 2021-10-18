import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataManagerService } from 'src/app/services/data-manager.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() show: boolean = true;

  public customers: Customer[];
  public selectedCustomer =  null;

  constructor(private apiService: ApiService, private router: Router, 
    private dataManagerService : DataManagerService) { }

  ngOnInit(): void {
    this.apiService.getCustomers().then((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  onOptionsSelected(value){
    if(value !== "0") {
      this.selectedCustomer = value;
      this.customerInfo();
    }

  }

  public customerInfo() {
    if (this.selectedCustomer != null) {
    this.dataManagerService.sendData(this.customers[this.selectedCustomer-1]);
    this.dataManagerService.customer = this.customers[this.selectedCustomer-1];
    this.router.navigateByUrl('customer/' + this.selectedCustomer);
    }
  }

  public productsInfo() {
    this.router.navigateByUrl('product/' + this.selectedCustomer);
  }

}
