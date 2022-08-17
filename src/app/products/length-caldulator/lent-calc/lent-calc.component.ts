/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-lent-calc',
  templateUrl: './lent-calc.component.html',
  styleUrls: ['./lent-calc.component.css']
})
export class LentCalcComponent implements OnInit {
    c!:number;
    v!: number;
    selected1:number = 0;
    selected2:number = 1;

    lengths = [
      {
        id:0,
        label:'Kilometre',
        unit:'km',
        val: 1
      },
      {
        id:1,
        label:'Meter',
        unit:'m',
        val:1000
      },
      {
        id:2,
        label:'Centemetre',
        unit:'cm', 
        val: 100000
      }

    ]
  constructor() { }

  ngOnInit(): void {
  }
  calcC(value: any){
    console.log(value);
    this.selected11(this.selected1)
    
  }
  calcF(value:any){
    this.selected12(this.selected2)
  }

  selected11(value:any){
    console.log(value);
   let new_val = this.lengths[value].val * this.c
    let val2 =   new_val * this.lengths[this.selected2].val
   this.v = val2;
    
  }
  selected12(value:any){
    console.log(value);
    let new_val = this.lengths[value].val * this.v
    let val2 =   new_val * this.lengths[this.selected1].val
   this.c = val2;
    
    
  }

}
