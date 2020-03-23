import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Camera as ImagePicker } from '@ionic-native/camera/ngx';

import { MrzScannerConfiguration } from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';
import { ImageResultsRepository } from '../services/image-results.repository';
import {BarcodeListService} from '../services/barcode-list.service';
import {json} from '@angular-devkit/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private scanbotService: ScanbotSdkDemoService,
              private imageResultsRepository: ImageResultsRepository,
              private dialogsService: DialogsService,
              private platform: Platform,
              private router: Router,
              private imagePicker: ImagePicker) { }

  async startDocumentScanner() {
    if (!(await this.scanbotService.checkLicense())) { return; }

    const configs = this.scanbotService.globalDocScannerConfigs();
    const result = await this.scanbotService.SDK.UI.startDocumentScanner({uiConfigs: configs});

    if (result.status === 'CANCELED') {
      // user has canceled the scanning operation
      return;
    }

    this.imageResultsRepository.addPages(result.pages);
    await this.gotoImageResults();
  }

  async pickImageFromPhotoLibrary() {
    // Import an image from Photo Library and run auto document detection on it.

    const picture = await this.imagePicker.getPicture({
        sourceType: this.imagePicker.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.imagePicker.MediaType.PICTURE,
        destinationType: this.imagePicker.DestinationType.FILE_URI,
        quality: 80,
        encodingType: this.imagePicker.EncodingType.JPEG,
        allowEdit: false,
    });
    const originalImageFileUri = picture as string;

    if (!(await this.scanbotService.checkLicense())) { return; }

    const loading = await this.dialogsService.createLoading('Auto-detecting and cropping...');
    try {
      loading.present();

      // First create a new SDK page with the selected original image file:
      const createResult = await this.scanbotService.SDK.createPage({originalImageFileUri});
      // and then run auto document detection and cropping on this new page:
      const docResult = await this.scanbotService.SDK.detectDocumentOnPage({page: createResult.page});

      this.imageResultsRepository.addPages([docResult.page]);
      this.gotoImageResults();
    } catch (e) {
      console.error('Unable to process selected image.', e);
      await this.dialogsService.showAlert(e.message, 'ERROR', 'Unable to process selected image.');
    }
    finally {
      await loading.dismiss();
    }
  }

  async gotoImageResults() {
    await this.router.navigateByUrl('/image-results');
  }

  async startBarcodeScanner() {
    if (!(await this.scanbotService.checkLicense())) { return; }

    const result = await this.scanbotService.SDK.UI.startBarcodeScanner({
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.'
      }
    });

    if (result.status === 'OK') {
      BarcodeListService.detectedBarcodes = result.barcodes;
      console.log("detected", JSON.stringify(BarcodeListService.detectedBarcodes));
      await this.router.navigateByUrl('/barcode-result-list');
    }
  }

  async startMrzScanner() {
    if (!(await this.scanbotService.checkLicense())) { return; }

    const config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.platform.is('ios')) {
      const widthPx = window.screen.width;
      config.finderWidth = widthPx * 0.9;
      config.finderHeight = widthPx * 0.18;
    }

    const result = await this.scanbotService.SDK.UI.startMrzScanner({uiConfigs: config});
    if (result.status === 'OK') {
      const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      await this.dialogsService.showAlert(fields.join(''), 'MRZ Result');
    }
  }

  async setAcceptedFormats() {
    await this.router.navigateByUrl('/barcode-list');
  }

  async viewLicenseInfo() {
    const result = await this.scanbotService.SDK.getLicenseInfo();
    await this.dialogsService.showAlert(JSON.stringify(result.info), 'License Info');
  }

  async importAndDetectBarcodes() {
    const picture = await this.imagePicker.getPicture({
      sourceType: this.imagePicker.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.imagePicker.MediaType.PICTURE,
      destinationType: this.imagePicker.DestinationType.FILE_URI,
      quality: 80,
      encodingType: this.imagePicker.EncodingType.JPEG,
      allowEdit: false,
    });

    const imageUri = picture as string;

    if (!(await this.scanbotService.checkLicense())) { return; }

    const result = await this.scanbotService.SDK.detectBarcodesOnImage({ imageFileUri: imageUri });
    BarcodeListService.detectedBarcodes = result.barcodes;
    console.log("detected", JSON.stringify(BarcodeListService.detectedBarcodes));
    await this.router.navigateByUrl('/barcode-result-list');
  }
}
