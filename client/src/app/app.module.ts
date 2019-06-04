import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FetchService } from "./fetch.service";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./navbar/navbar.component";
import { SelectDropDownModule } from "ngx-select-dropdown";

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    SelectDropDownModule
  ],
  providers: [FetchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
