import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {ForgotPageComponent} from "./forgot-page/forgot-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path:'', redirectTo: '/login', pathMatch: 'full'},
      {path:'login', component: LoginPageComponent},
      {path:'forgot', component: ForgotPageComponent}
    ]
  },
  {
    path: '', component:SiteLayoutComponent, children: []
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
