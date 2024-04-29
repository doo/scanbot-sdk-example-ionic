import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenericDocumentRecognizerResultsPage } from './generic-document-recognizer-results.page';
import {SectionListComponent} from '../section-list/section-list.component';

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
        RouterModule.forChild(routes),
        SectionListComponent
    ],
  declarations: [GenericDocumentRecognizerResultsPage]
})
export class GenericDocumentRecognizerResultsPageModule {}
