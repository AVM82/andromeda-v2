import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;

  constructor(private auth: AuthService,
              private  router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    document.body.classList.add('bg-img');
  }

  onSubmit(){
    this.form.disable();
    this.subscription = this.auth.forgot(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'],{
          queryParams: {
            passRefreshed: true
          }
        })
      },
      error => {
        console.warn(error);
        this.form.enable();
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    document.body.classList.remove('bg-img');
  }

}
