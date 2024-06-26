import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieBannerModule } from "angular2-cookie-banner";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CookieBannerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
