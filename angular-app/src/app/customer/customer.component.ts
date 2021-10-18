import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../models/customer';
import { DataManagerService } from '../services/data-manager.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customer : Customer;

  constructor( private dataManagerService : DataManagerService) { }

  ngOnInit(): void {
    this.dataManagerService.customerData$ // subscribe to the Observable
      .subscribe(item => this.customer = item);

  }

}
