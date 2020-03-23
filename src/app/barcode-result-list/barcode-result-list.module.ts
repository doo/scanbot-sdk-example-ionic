import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BarcodeResultListPage } from './barcode-result-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: BarcodeResultListPage
      }
    ])
  ],
  declarations: [BarcodeResultListPage]
})

export class BarcodeResultListPageModule {}
