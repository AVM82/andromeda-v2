import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  authSubscription: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private toast: ToastService) {
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
          this.toast.showSuccess('Теперь вы пожете войти в систему')
        } else if (params['accessDenied']) {
          this.toast.showError('Отказано в доступе')
        } else if (params['passRefreshed']) {
          this.toast.showInfo('На e-mail был отправлен новый пароль')
          //Find you new password in e-mail
        } else if (params['sessionFailed']) {
          this.toast.showInfo('Invalid token, login again');
        }
      })
  }

  onSubmit() {
    this.form.disable();
    this.authSubscription = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        this.toast.showError(error.error.message);
        this.form.enable();
      }
    )
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    document.body.classList.remove('bg-img');
  }
}
