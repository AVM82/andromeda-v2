import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reg-page',
  templateUrl: './reg-page.component.html',
  styleUrls: ['../login-page/login-page.component.css']
})
export class RegPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private auth: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    document.body.classList.add('bg-img');
  }

  onSubmit() {
    this.form.disable();
    this.subscription = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        console.warn(error);
        this.form.enable();
      }
    )

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    document.body.classList.remove('bg-img');
  }
}
