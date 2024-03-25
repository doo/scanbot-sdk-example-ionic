import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MrzScannerResultsPageRoutingModule } from './mrz-scanner-results-routing.module';

import { MrzScannerResultsPage } from './mrz-scanner-results.page';
import {SectionListComponent} from '../section-list/section-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MrzScannerResultsPageRoutingModule,
    SectionListComponent
  ],
  declarations: [MrzScannerResultsPage]
})
export class MrzScannerResultsPageModule {}
