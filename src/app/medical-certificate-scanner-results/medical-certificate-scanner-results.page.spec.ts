import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalCertificateScannerResultsPage } from './medical-certificate-scanner-results.page';

describe('MedicalCertificateScannerResultsPage', () => {
  let component: MedicalCertificateScannerResultsPage;
  let fixture: ComponentFixture<MedicalCertificateScannerResultsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MedicalCertificateScannerResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
