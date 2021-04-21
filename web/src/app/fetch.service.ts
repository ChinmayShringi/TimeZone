import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
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
  api_hostname: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public searchFilter(user: searchFilter): Observable<any> {
    return this.http.post(`${this.api_hostname}/filter`, user);
  }
  public search(user: any): Observable<any> {
    return this.http.post(`${this.api_hostname}/search`, user);
  }
}
