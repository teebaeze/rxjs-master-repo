/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { catchError, combineLatest, EMPTY, map, Observable, startWith, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable()
  
  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable()
  
  categories$ = this.categoryService.productCategories$
  .pipe(
    catchError(err => {
    this.errorMessageSubject.next(err);
      return EMPTY
    })
  )
  // [
  //   {id: 1, name: 'string',description: 'string'}
  //  ];
   selectedCategoryId:number | undefined;
   
  //  productsSimpleFilter$ = this.productService.productsWithCategory$
  //  .pipe(
  //    map(products =>
  //    products.filter(product => this.selectedCategoryId ? product.catrgoryId === this.selectedCategoryId:true)
  //    products )
  //  )

  products$ = combineLatest([ this.productService.productsWithAdd$, this.categorySelectedAction$
  // .pipe(
  //   startWith(0),
  // )
])
  .pipe(
   
   map(([products, selectedCategoryId ]) =>
    
   products.filter(product => selectedCategoryId ? product.categoryId === selectedCategoryId : true)),
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY
    })
  )

  // productsSimpleFilter$ = this.productService.productsWithCategory$
  // .pipe(
  //       map( products =>products.filter(product => 
  //         this.selectedCategoryId ?product.categoryId === this.selectedCategoryId :true)
  //         ),
  // )

  // sub!: Subscription;

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  ngOnInit() {
   this.productService.getweather()
    // this.products$ = this.productService.getProducts()
    // .pipe(
    //   catchError(err => {
    //     this.errorMessage = err;
    //     return EMPTY
    //   })
    // )
      // .subscribe({
      //   next: products => this.products = products,
      //   error: err => this.errorMessage = err
      // });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  onAdd(): void {
   this.productService.addProduct()
  }

  onSelected(categoryId: string): void {
    console.log(categoryId);
    // this.selectedCategoryId = +categoryId
    this.categorySelectedSubject.next(+categoryId)
  }
}
