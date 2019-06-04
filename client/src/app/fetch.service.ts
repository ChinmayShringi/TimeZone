import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
export interface snm {
  name: string;
  codeIso: string;
}
interface searchFilter {
  sname: string;
}
@Injectable({
  providedIn: "root"
})
export class FetchService {
  constructor(private http: HttpClient) {}

  public searchFilter(user: searchFilter): Observable<any> {
    return this.http.post("http://localhost:3000/filter", user);
  }
  public search(user: any): Observable<any> {
    return this.http.post("http://localhost:3000/search", user);
  }
}
