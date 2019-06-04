import { Component } from "@angular/core";
import { FetchService } from "../fetch.service";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent {
  constructor(public filter: FetchService) {}
  srch() {
    this.filter.search({ name: "hazira", codeIso: "IN" }).subscribe(
      arg => {
        console.log(arg);
      },
      err => {
        console.error(err);
      }
    );
  }

  cred: {
    sname: string;
  } = { sname: "" };
  arrayResult: {
    final: [];
  } = { final: [] };
  updateSearch(value: any) {
    this.cred = { sname: value };
    this.filter.searchFilter(this.cred).subscribe(
      arg => {
        this.arrayResult = arg;
      },
      err => {
        console.error(err);
      }
    );
  }
}
