import { Component } from "@angular/core";
import { FetchService } from "../fetch.service";
import { srh } from "../model";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
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

  //call this function if filter selected
  srch(arg) {
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
