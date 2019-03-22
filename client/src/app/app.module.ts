import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {ForgotPageComponent} from './forgot-page/forgot-page.component';
import {RegPageComponent } from './reg-page/reg-page.component';
import {TokenInterceptor} from "./shared/token.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ng6-toastr-notifications";
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { SidebarLayoutComponent } from './shared/layouts/sidebar-layout/sidebar-layout.component';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { ResearchPageComponent } from './research-page/research-page.component';
import { PatientsPageComponent } from './patients-page/patients-page.component';
import { VisitsPageComponent } from './visits-page/visits-page.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    ForgotPageComponent,
    RegPageComponent,
    OverviewPageComponent,
    SidebarLayoutComponent,
    CalendarPageComponent,
    ResearchPageComponent,
    PatientsPageComponent,
    VisitsPageComponent,
    StatisticsPageComponent,
    ChatPageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
