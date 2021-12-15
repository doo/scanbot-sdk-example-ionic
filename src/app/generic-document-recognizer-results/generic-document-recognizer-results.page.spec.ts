import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDocumentRecognizerResultsPage } from './generic-document-recognizer-results.page';

describe('GenericDocumentRecognizerResultsPage', () => {
  let component: GenericDocumentRecognizerResultsPage;
  let fixture: ComponentFixture<GenericDocumentRecognizerResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDocumentRecognizerResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDocumentRecognizerResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
