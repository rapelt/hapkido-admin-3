import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcePasswordChangePage } from './force-password-change.page';

describe('ForcePasswordChangePage', () => {
  let component: ForcePasswordChangePage;
  let fixture: ComponentFixture<ForcePasswordChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcePasswordChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcePasswordChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
