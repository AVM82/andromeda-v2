import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registered']) {
          //Now you can login
        } else if (params['accessDenied']) {
          //Авторизуйтесь в системе
        }

    })
  }

  onSubmit() {
    this.form.disable();
    this.subscription = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/forgot']),
      error => {
        console.warn(error);
        this.form.enable();
      }
    )
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    document.body.classList.remove('bg-img');
  }
}
