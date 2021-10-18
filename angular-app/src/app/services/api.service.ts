import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../models/customer";
import { Product } from "../models/product";

@Injectable()

export class ApiService {

    private URL = 'https://localhost:44396/product/';
    
    constructor(private http: HttpClient) {}

    getCustomers() : Promise<void | Customer[]>{
        return this.http.get(this.URL + 'GetCustomers')
          .toPromise()
          .then(response => response as Customer[])
          .catch(this.handleError);
      }

    getProducts(customerId : string) : Promise<void | Product[]>{
      return this.http.get(this.URL + 'GetProducts?customerId='+customerId)
        .toPromise()
        .then(response => response as Product[])
        .catch(this.handleError);
    }

    updateProducts(product : Product) : Promise<void | Number>{
      return this.http.post(this.URL + 'UpdateProduct', product)
        .toPromise()
        .then(response => response as Number)
        .catch(this.handleError);
    }
    
    deleteProduct(productId: string): Promise<void | Number>{
      return this.http.post(this.URL + 'DeleteProduct?productId=' + productId, null)
      .toPromise()
      .then(response => response as Number)
      .catch(this.handleError);
    }

    private handleError(error: any){
    console.log("error");
    }

}