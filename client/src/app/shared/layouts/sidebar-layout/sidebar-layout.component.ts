import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent implements OnInit {

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/calendar', name: 'Календарь'},
    {url: '/research', name: 'Исследования'},
    {url: '/patients', name: 'Пациенты'},
    {url: '/visits', name: 'График визитов'},
    {url: '/statistics', name: 'Статистика'},
    {url: '/chat', name: 'Чат'}
  ];

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
