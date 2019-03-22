import { Component, OnInit } from '@angular/core';
import {ResearchService} from "../services/research-service";
import {Research} from "../shared/model/Research";
import {Observable} from "rxjs";

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
export class ResearchPageComponent implements OnInit {
  researchTableHeader = [
    '#',
    'Исследование',
    'Организация',
    'Дата инициации',
    'Дата последнего пациента',
    'Активно',
    'Визиты',
    'Редактировать'
    ];

  research$: Observable<Research[]>;

  constructor(private researchService : ResearchService) { }

  ngOnInit() {
    this.research$ = this.researchService.getAllResearch();
  }
}
