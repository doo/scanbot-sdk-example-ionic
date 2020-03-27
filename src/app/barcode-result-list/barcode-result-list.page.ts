import { Component, OnInit } from '@angular/core';
import {BarcodeListService} from '../services/barcode-list.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-barcode-result-list',
  templateUrl: './barcode-result-list.page.html',
  styleUrls: ['./barcode-result-list.page.scss'],
})
export class BarcodeResultListPage {

  imageSourceUri: string;
  barcodes = [];

  constructor(public sanitizer: DomSanitizer) {
    if (BarcodeListService.snappedImage) {
      this.imageSourceUri = this.sanitizeFileUri(BarcodeListService.snappedImage);
    }
    this.barcodes = BarcodeListService.detectedBarcodes;
  }

  private sanitizeFileUri(fileUri: string): string {
    // see https://ionicframework.com/docs/building/webview/#file-protocol
    const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
    // see https://angular.io/guide/security#bypass-security-apis
    return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
  }
}
