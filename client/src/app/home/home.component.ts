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
    name: string;
    codeIso: string;
    latitude: number;
    logitude: number;
  } = {
    name: "",
    codeIso: "",
    latitude: null,
    logitude: null
  };
  details: srh;
  constructor(private fetch: FetchService, private http: HttpClient) {}

  //call this function if filter selected
  srch(value1, value2, value3, value4) {
    this.cred.name = value1;
    this.cred.codeIso = value2;
    this.cred.latitude = value3;
    this.cred.logitude = value4;
    this.fetch.search({ name: "hazira", codeIso: "IN" }).subscribe(
      arg => {
        this.show = false;
        this.details = arg;
      },
      err => {
        console.error(err);
      }
    );
  }
}
