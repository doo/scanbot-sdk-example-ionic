import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckRecognizerResultsPage } from './check-recognizer-results.page';
import { SectionListComponent } from '../section-list/section-list.component';

const routes: Routes = [
  {
    path: '',
    component: CheckRecognizerResultsPage
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
    declarations: [CheckRecognizerResultsPage]
})
export class CheckRecognizerResultsPageModule {}
