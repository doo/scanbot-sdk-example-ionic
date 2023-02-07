import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CheckRecognizerResultsPage } from './check-recognizer-results.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [CheckRecognizerResultsPage]
})
export class CheckRecognizerResultsPageModule {}
