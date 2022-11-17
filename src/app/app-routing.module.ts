import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'image-results', loadChildren: './image-results/image-results.module#ImageResultsPageModule' },
  { path: 'image-view/:pageId', loadChildren: './image-view/image-view.module#ImageViewPageModule' },
  { path: 'barcode-list', loadChildren: './barcode-list/barcode-list.module#BarcodeListModule' },
  { path: 'barcode-document-list', loadChildren: './barcode-document-list/barcode-document-list.module#BarcodeDocumentListModule' },
  { path: 'barcode-result-list', loadChildren: './barcode-result-list/barcode-result-list.module#BarcodeResultListPageModule' },
  { path: 'html5-camera', loadChildren: './html5-camera/html5-camera.module#Html5CameraPageModule' },
  { path: 'generic-document-recognizer-results', loadChildren: './generic-document-recognizer-results/generic-document-recognizer-results.module#GenericDocumentRecognizerResultsPageModule' },
  { path: 'check-recognizer-results', loadChildren: './check-recognizer-results/check-recognizer-results.module#CheckRecognizerResultsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
