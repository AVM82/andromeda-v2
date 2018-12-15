import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPageComponent } from './reg-page.component';

describe('RegPageComponent', () => {
  let component: RegPageComponent;
  let fixture: ComponentFixture<RegPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
