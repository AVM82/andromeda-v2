import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ForgotPageComponent} from "./forgot-page/forgot-page.component";
import {RegPageComponent} from "./reg-page/reg-page.component";
import {AuthGuard} from "./shared/auth.guard";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {CalendarPageComponent} from "./calendar-page/calendar-page.component";
import {ResearchPageComponent} from "./research-page/research-page.component";
import {PatientsPageComponent} from "./patients-page/patients-page.component";
import {VisitsPageComponent} from "./visits-page/visits-page.component";
import {StatisticsPageComponent} from "./statistics-page/statistics-page.component";
import {ChatPageComponent} from "./chat-page/chat-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path:'', redirectTo: '/login', pathMatch: 'full'},
      {path:'login', component: LoginPageComponent},
      {path:'forgot', component: ForgotPageComponent},
      {path:'reg', component: RegPageComponent}
    ]
  },
  {
    path: '', component:SiteLayoutComponent, canActivate:[AuthGuard], children: [
      {path:'overview', component: OverviewPageComponent},
      {path:'calendar', component: CalendarPageComponent},
      {path:'research', component: ResearchPageComponent},
      {path:'patients', component: PatientsPageComponent},
      {path:'visits', component: VisitsPageComponent},
      {path:'statistics', component: StatisticsPageComponent},
      {path:'chat', component: ChatPageComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
