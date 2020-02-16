import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExptetionComponent } from './exptetion.component';

describe('ExptetionComponent', () => {
  let component: ExptetionComponent;
  let fixture: ComponentFixture<ExptetionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExptetionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExptetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
