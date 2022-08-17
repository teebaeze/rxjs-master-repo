import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { catchError, combineLatest, EMPTY, filter, map, Subject } from 'rxjs';
import { Supplier } from 'src/app/suppliers/supplier';
import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  

  private errorMessageSubject = new Subject<string>();
   errorMessage$ = this.errorMessageSubject.asObservable()
  
  product: Product | null = null;
  // productSuppliers: Supplier[] | null = null;
  productSuppliers$ = this.productService.selectedProductSuppliers$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err)
      return EMPTY
    })
  )

//  

singleProduct$ = this.productService.getselectedProduct$
pageTitle$ = this.singleProduct$
  .pipe(
    map(p => p ? `Product Detail for: ${p.productName}`: null)
  ) ;
  vm$ = combineLatest([
    this.singleProduct$,
    this.productSuppliers$,
    this.pageTitle$
  ])
  .pipe(
    filter(([Product])=> Boolean(Product)),
    map(([product, productSuppliers, pageTitle])=>({product,productSuppliers,pageTitle}))

  )
  constructor(private productService: ProductService) { 
   

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.productSuppliers$, 'Suppliers');
    
  }

}
