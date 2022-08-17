/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Cityweather {
name: string;
weather:string;
status: string[];
}

interface ApiResponse {
page: number;
per_page: number;
total: number;
total_pages: number;
data: Cityweather[]

}

@Component({
  selector: 'pm-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  searchForm!: FormGroup;
  search!:string;
  weatherResult!:Cityweather
  constructor( private http: HttpClient) { }

  ngOnInit(): void {
    // this.weatherResult = []
    this.searchForm = new FormGroup({
      search: new FormControl(null, [Validators.required])
    })
  }
onSubmit(){
  console.log(this.searchForm.value);
  
  this.http.get<ApiResponse>(`https://jsonmock.hackerrank.com/api/weather?${this.search}`).subscribe(data =>{
    console.log(data);
    this.weatherResult = data.data[0];
    
    
  })
  
}
}
