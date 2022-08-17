import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}
@Component({
  selector: 'pm-football',
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent implements OnInit {
  totalPages!:number[];
  competetionDetails:Competition[] = [];
  

  constructor(private http: HttpClient) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.loadDetailsPerPage(1)
    
  }
  loadDetailsPerPage(pageNumber:number){
    this.getCompetitionDetails(pageNumber).subscribe(
      data=> {
        console.log(data);
        
        this.totalPages = Array<any>(data.total_pages).fill(undefined).map((x,i)=> i)
        console.log(this.totalPages);
        this.competetionDetails = data.data
        
      }
    )
  }
  getCompetitionDetails(pageNumber:number){
    const URL = 'https://jsonmock.hackerrank.com/api/football_competitions?page=' + pageNumber
        return this.http.get<ApiResponse>(URL).pipe(data => data)

  }

}
