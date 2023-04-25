import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(x => x.HomePageModule) },
  { path: 'image-results', loadChildren: () => import('./image-results/image-results.module').then(x => x.ImageResultsPageModule)},
  { path: 'image-view/:pageId', loadChildren: () => import('.//image-view/image-view.module').then(x => x.ImageViewPageModule)},
  { path: 'barcode-list', loadChildren: () => import('./barcode-list/barcode-list.module').then(x => x.BarcodeListModule)},
  { path: 'barcode-document-list', loadChildren: () => import('./barcode-document-list/barcode-document-list.module').then(x => x.BarcodeDocumentListModule)},
  { path: 'barcode-result-list', loadChildren: () => import('./barcode-result-list/barcode-result-list.module').then(x => x.BarcodeResultListPageModule)},
  { path: 'html5-camera', loadChildren: () => import('./html5-camera/html5-camera.module').then(x => x.Html5CameraPageModule)},
  { path: 'generic-document-recognizer-results', loadChildren: () => import('./generic-document-recognizer-results/generic-document-recognizer-results.module').then(x => x.GenericDocumentRecognizerResultsPageModule)},
  { path: 'check-recognizer-results', loadChildren: () => import('./check-recognizer-results/check-recognizer-results.module').then(x => x.CheckRecognizerResultsPageModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
