import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  authSubscription: Subscription;

  constructor(private auth: AuthService,
              private  router: Router,
              private toast: ToastService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    document.body.classList.add('bg-img');
  }

  onSubmit(){
    this.form.disable();
    this.authSubscription = this.auth.forgot(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'],{
          queryParams: {
            passRefreshed: true
          }
        })
      },
      error => {
        this.toast.showError(error.error.message);
        this.form.enable();
      }
    );

  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    document.body.classList.remove('bg-img');
  }

}
