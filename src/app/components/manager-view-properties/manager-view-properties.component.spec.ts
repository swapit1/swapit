import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewPropertiesComponent } from './manager-view-properties.component';

describe('ManagerViewPropertiesComponent', () => {
  let component: ManagerViewPropertiesComponent;
  let fixture: ComponentFixture<ManagerViewPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerViewPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerViewPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
