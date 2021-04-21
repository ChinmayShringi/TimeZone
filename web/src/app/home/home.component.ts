import { Component, OnInit } from '@angular/core';
import { FetchService } from "../fetch.service";
import { srh } from "../model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  show: boolean = true;
  loader: boolean = false;
  cred: {
    city: string;
    countryIso: string;
  } = {
    city: "",
    countryIso: ""
  };
  details: srh;
  constructor(private fetch: FetchService, private http: HttpClient) {}
  ngOnInit(){}

  //call this function if filter selected
  srch(arg) {
    console.log(arg);
    this.loader = true;
    this.fetch.search(arg).subscribe(
      arg => {
        this.show = false;
        this.details = arg;
        this.loader = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  //Filter Function
  arrayResult: {
    final: [];
  } = { final: [] };
  updateSearch(value: any) {
    if(value.length!=0){
    this.loader = true;
    this.fetch.searchFilter({ sname: value }).subscribe(
      arg => {
        this.loader = false;
        this.arrayResult = arg;
      },
      err => {
        console.error(err);
      }
    );
  }
}

}
