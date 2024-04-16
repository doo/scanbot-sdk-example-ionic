import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MrzScannerResultsPage } from './mrz-scanner-results.page';

const routes: Routes = [
  {
    path: '',
    component: MrzScannerResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MrzScannerResultsPageRoutingModule {}
