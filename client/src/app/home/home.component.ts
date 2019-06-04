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
  cred: {
    city: string;
    countryIso: string;
  } = {
    city: "",
    countryIso: ""
  };
  details: srh;
  constructor(private fetch: FetchService, private http: HttpClient) {}
  //call if button clicked
  srchBtn() {
    this.fetch.search(this.cred).subscribe(
      arg => {
        this.show = false;
        this.details = arg;
      },
      err => {
        console.error(err);
      }
    );
  }

  //call this function if filter selected
  srch(arg) {
    this.fetch.search(arg).subscribe(
      arg => {
        this.show = false;
        this.details = arg;
      },
      err => {
        console.error(err);
      }
    );
  }

  //Filter Function

  credable: {
    sname: string;
  } = { sname: "" };
  arrayResult: {
    final: [];
  } = { final: [] };
  updateSearch(value: any) {
    this.credable = { sname: value };
    this.fetch.searchFilter(this.credable).subscribe(
      arg => {
        this.arrayResult = arg;
        console.log(this.arrayResult.final);
      },
      err => {
        console.error(err);
      }
    );
  }
  goHome() {
    this.show = true;
    this.details = null;
    this.cred = null;
    this.arrayResult = null;
  }
}
