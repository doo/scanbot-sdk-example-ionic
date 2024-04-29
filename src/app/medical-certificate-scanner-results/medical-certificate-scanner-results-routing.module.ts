import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalCertificateScannerResultsPage } from './medical-certificate-scanner-results.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalCertificateScannerResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalCertificateScannerResultsPageRoutingModule {}
