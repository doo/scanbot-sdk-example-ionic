import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MrzScannerResultsPage } from './mrz-scanner-results.page';

describe('MrzScannerResultsPage', () => {
  let component: MrzScannerResultsPage;
  let fixture: ComponentFixture<MrzScannerResultsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MrzScannerResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
