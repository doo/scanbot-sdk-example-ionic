import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalCertificateScannerResultsPageRoutingModule } from './medical-certificate-scanner-results-routing.module';

import { MedicalCertificateScannerResultsPage } from './medical-certificate-scanner-results.page';
import {SectionListComponent} from '../section-list/section-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MedicalCertificateScannerResultsPageRoutingModule,
        SectionListComponent
    ],
  declarations: [MedicalCertificateScannerResultsPage]
})
export class MedicalCertificateScannerResultsPageModule {}
