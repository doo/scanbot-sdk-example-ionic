import { Component, OnInit } from '@angular/core';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {ImageResultsRepository} from '../services/image-results.repository';
import {DialogsService} from '../services/dialogs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController} from '@ionic/angular';
import {BarcodeListService} from '../services/barcode-list.service';
import {File} from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';

declare var cordova: any;

@Component({
  selector: 'app-barcode-result-list',
  templateUrl: './barcode-result-list.page.html',
  styleUrls: ['./barcode-result-list.page.scss'],
})
export class BarcodeResultListPage {

  imageSourceUri: string;
  barcodes = [];

  constructor(public sanitizer: DomSanitizer) {

    console.log(BarcodeListService.snappedImage);
    BarcodeListService.normalizeUrl();
    this.imageSourceUri = this.sanitizeFileUri(BarcodeListService.snappedImage);
    console.log(this.imageSourceUri);

    this.barcodes = BarcodeListService.detectedBarcodes;
  }

  private sanitizeFileUri(fileUri: string): string {
    // see https://ionicframework.com/docs/building/webview/#file-protocol
    const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
    // see https://angular.io/guide/security#bypass-security-apis
    return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
  }
}
