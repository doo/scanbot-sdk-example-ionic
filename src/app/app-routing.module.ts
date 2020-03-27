import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'image-results', loadChildren: './image-results/image-results.module#ImageResultsPageModule' },
  { path: 'image-view/:pageId', loadChildren: './image-view/image-view.module#ImageViewPageModule' },
  { path: 'barcode-list', loadChildren: './barcode-list/barcode-list.module#BarcodeListModule' },
  { path: 'barcode-result-list', loadChildren: './barcode-result-list/barcode-result-list.module#BarcodeResultListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
