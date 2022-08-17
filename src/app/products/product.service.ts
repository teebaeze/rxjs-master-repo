import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, catchError, combineLatest, filter, forkJoin, map, merge, Observable, of, scan, shareReplay, Subject, switchMap, tap, throwError } from 'rxjs';

import { Product } from './product';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { SupplierService } from '../suppliers/supplier.service';
import { Supplier } from '../suppliers/supplier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = 'api/suppliers';
  
  constructor(private http: HttpClient, private productCategoryService: ProductCategoryService, private supplierService: SupplierService) { }
  
  addProduct(newProduct?: Product){
    newProduct = newProduct || this.fakeProduct()
    this.productInsertedSubject.next(newProduct)
  }
  getweather(){
    this.http.get('https://api.npms.io/v2/search?q=scope:angular')
    .pipe(tap(data => console.log(data)
    ))
  }

  products$ = this.http.get<Product[]>(this.productsUrl)
  .pipe(
    // map(products => products
    //   .map(product => ({
    //     ...product,
    //     price: product.price ? product.price * 1.5 :0,
    //     searchKey: [ product.productName]
    //   } as Product) )),
    tap(data => console.log('Products: ', JSON.stringify(data))),
    // shareReplay(1),
    catchError(this.handleError)
  );

  productsWithCategory$ = combineLatest([this.products$, this.productCategoryService.productCategories$])
  .pipe( 
    map(([products, categories])=>
    products.map(product => ({
      ...product,
      price: product.price ? product.price * 1.5 :0,
      category: categories.find(c =>product.categoryId ===c.id)?.name,
      searchKey: [ product.productName]

    }))

    ),
    shareReplay(1),
  
  )

   private productInsertedSubject = new Subject<Product>()
  productInsertedAction = this.productInsertedSubject.asObservable()

  productsWithAdd$ = merge(
    this.productsWithCategory$, this.productInsertedAction
  ).pipe(
    scan((acc, value)=>
      (value instanceof Array) ? [...value]: [...acc, value], [] as Product[]
  )
  )
  selectedProductSubject$ = new BehaviorSubject <number>(1);
  selectedProductAction$ = this.selectedProductSubject$.asObservable()

  getselectedProduct$ = combineLatest([this.productsWithCategory$, this.selectedProductAction$])
  .pipe(
  
    map(([products, selectedProductId]) =>
    products.find(product => product.id === selectedProductId)),
    // tap(product => console.log('selected produvt', product)
    // )
  )
  // get selected products with suppliers( Get it all approach)
  // selectedProductSuppliers$ = combineLatest([this.getselectedProduct$, this.supplierService.allSuppliers$])
  // .pipe(
  //   map(([selectedProduct, suppliers ]) =>
  //     suppliers.filter(supplier => selectedProduct?.supplierIds?.includes(supplier.id) )
  // ),
  // tap(product => console.log('suppliermapped', product)
  // )
    
   
  // );
// get selected product suppliers just in time approach

selectedProductSuppliers$ = this.getselectedProduct$
.pipe(
  filter(product => Boolean(product)),
  switchMap(selectedProduct => {
    if (selectedProduct?.supplierIds) {
      return forkJoin(selectedProduct?.supplierIds.map(
        supplierId => this.http.get<Supplier>(`${this.suppliersUrl}/ ${supplierId}`)
      ))
    } else {
      return of([])
    }
  }),
  tap(suppliers => console.log('selected suppliers', JSON.stringify(suppliers))
  )

) ;
  selectedProductChanged(selectedProductId:number){ 
    this.selectedProductSubject$.next(selectedProductId);
    // console.log(this.selectedProductSuppliers$, 'here');
    
  }

  
  // this.productsWithCategory$ 
  // .pipe(
  //   map( products =>
  //     products.find(product => product.id ===5)
  //   ),
  //     tap(product => console.log('selected product', product))
      
  // )supplier

  // getProducts(): Observable<Product[]> {
  //   return 
  // }

  private fakeProduct(): Product {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30
    };
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
