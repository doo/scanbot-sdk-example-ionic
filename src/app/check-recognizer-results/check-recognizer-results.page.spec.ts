import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRecognizerResultsPage } from './check-recognizer-results.page';

describe('CheckRecognizerResultsPage', () => {
  let component: CheckRecognizerResultsPage;
  let fixture: ComponentFixture<CheckRecognizerResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckRecognizerResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckRecognizerResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
