import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id : string;
  products : Product[];
  editProfileForm: FormGroup;
  mode : 'Create';
  newProduct : Product;

  public displayedColumns = ['productId', 'productName', 'productPrice', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService : ApiService, private router: Router,private route: ActivatedRoute,
    private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('customerId');
    this.newProduct = new Product();
    this.apiService.getProducts(this.id).then((products: Product[]) => {
      this.dataSource.data = products;
    });
    this.editProfileForm = this.fb.group({
      productId: [''],
      productName: [''],
      productPrice: [''],
      customerId: [''],
     });
  }

  openModal(targetModal, product, mode) {
    this.mode = mode;
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   
    this.editProfileForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      customerId: product.customerId
    });
   }

  onSubmit() {
    this.modalService.dismissAll();
    let product = this.editProfileForm.getRawValue();
    if(this.mode == 'Create') {
      product.customerId = this.id;
    }
    this.apiService.updateProducts(product)
    .then((productId: Number) => {
      this.ngOnInit();
    });
    
   }

  delete(productId) {
    this.apiService.deleteProduct(productId)
    .then((productId: Number) => {
      this.ngOnInit();
    });
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
