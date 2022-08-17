import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  c!: number;
  v!: number;
  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }
  calcC(value: number){
    console.log(value,'value C')
    let newC = (value * (9/5) + 32)
    this.v = newC
  }
  calcF(value: number){
    console.log(value,'value F')
    let newF = (value-32 * (9/5) )
    this.c = newF
  }

}
