import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenericDocumentRecognizerResultsPage } from './generic-document-recognizer-results.page';

const routes: Routes = [
  {
    path: '',
    component: GenericDocumentRecognizerResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GenericDocumentRecognizerResultsPage]
})
export class GenericDocumentRecognizerResultsPageModule {}
