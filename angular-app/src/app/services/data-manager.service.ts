// Angular Imports
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})

export class DataManagerService implements OnDestroy {

  private customerData = new BehaviorSubject<Customer>(null); 

  public customer: Customer;

  customerData$ = this.customerData.asObservable();

  sendData(value) {
    this.customerData.next(value);
  }

  public ngOnDestroy(): void {}

}