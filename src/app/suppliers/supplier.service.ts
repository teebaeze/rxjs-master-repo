/* eslint-disable rxjs/no-nested-subscribe */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, of, map, tap, concatMap, mergeMap, switchMap, catchError, shareReplay } from 'rxjs';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';
// Get all suppliers
allSuppliers$ = this.http.get<Supplier[]>(this.suppliersUrl)
.pipe(
  tap(data => console.log('Supplier', JSON.stringify(data))
  ),
  shareReplay(1),
  catchError(this.handleError)
)
/**  
supplierswithMap$ = of(1,7,8)
  .pipe(
    //for the concat mapping 
   
  //  this is for normal mapping 
    map(id => this.http.get<Supplier> (`${this.suppliersUrl}/${id}`))
  )

  supplierswithconcatMap$ = of(1,7,8)
  .pipe(
    //for the concat mapping 
    tap( (id:number) => console.log('concat source observable', id)),
    concatMap( id => this.http.get<Supplier>(`${this.suppliersUrl}/ ${id}`))
    
 
  );
  supplierWithMergeMap$ = of (1,7,8)
  .pipe(
    tap((id:number) => console.log('merge source observables', id)),
    mergeMap( id => this.http.get<Supplier> (`${this.suppliersUrl}/${id}`))
  )

  supplierWithSwitchMap$ = of (1,7,8)
  .pipe(
    tap((id:number) => console.log('Switch source observables', id)),
    switchMap( id => this.http.get<Supplier> (`${this.suppliersUrl}/${id}`))
  )*/

  constructor(private http: HttpClient) {
    // this.supplierWithSwitchMap$
    // .subscribe(
    //   item => console.log('Switch result', item)
      
    // )
    // this.supplierswithconcatMap$
    // .subscribe(
    //   item => console.log('concatmap result', item)
      
    // )
    // subscription for normal mapping
    // .subscribe(o => o.subscribe(
    //   // item => console.log('map result', item);
    //  (item:any) => console.log('mapped,result', item )  
    // ));
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
