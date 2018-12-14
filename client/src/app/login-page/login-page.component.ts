import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-img');
  }
}
