import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Camera as ImagePicker } from '@ionic-native/camera/ngx';

import ScanbotSdk, {HealthInsuranceCardScannerConfiguration, MrzScannerConfiguration} from 'cordova-plugin-scanbot-sdk';

import { DialogsService } from '../services/dialogs.service';
import { ScanbotSdkDemoService } from '../services/scanbot-sdk-demo.service';
import { ImageResultsRepository } from '../services/image-results.repository';
import {BarcodeListService} from '../services/barcode-list.service';
import {load} from '@angular/core/src/render3';

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
              private imagePicker: ImagePicker) {

    document.addEventListener('deviceready', function() {
      /*
       * Register a vanilla javascript callback, as setLicenseFailure registers a continuous callback
       * that does not adhere to the standards of promisified API.
       * All other Scanbot features are also a part of the normal, non-promisified API
       *
       * Note that, as is, license failure handler is never called, because in this example
       * we always check license validity before calling any Scanbot API.
       */
      ScanbotSdk.setLicenseFailureHandler(async callback => {
        const status = callback.licenseStatus;
        const feature = callback.licenseFeature;
        console.log('Feature ' + feature + ' is not available because license is ' + status);
      });
    });
  }

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
      await loading.present();

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
        finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
        barcodeFormats: BarcodeListService.getAcceptedTypes(),
        barcodeImageGenerationType: 'VIDEO_FRAME',
        finderLineColor: '#0000ff',
        topBarBackgroundColor: '#c8193c',
        // see further configs ...
      }
    });

    if (result.status === 'OK') {
      BarcodeListService.detectedBarcodes = result.barcodes;
      BarcodeListService.snappedImage = result.imageFileUri;
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

  async startEHICScanner() {

    if (!(await this.scanbotService.checkLicense())) {
      return;
    }

    const config: HealthInsuranceCardScannerConfiguration = {
      finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.'
    };
    const result = await this.scanbotService.SDK.UI.startEHICScanner({uiConfigs: config});
    if (result.status === 'OK') {
      const fields = result.ehicResult.fields.map(f => `<div>${f.type}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      await this.dialogsService.showAlert(fields.join(''), 'EHIC Result');
    }
  }
    async setAcceptedFormats() {
    await this.router.navigateByUrl('/barcode-list');
  }

  async viewLicenseInfo() {
    const result = await this.scanbotService.SDK.getLicenseInfo();
    await this.dialogsService.showAlert(JSON.stringify(result.info), 'License Info');
  }

  async viewOcrConfigs() {
    const result = await this.scanbotService.SDK.getOcrConfigs();
    await this.dialogsService.showAlert(JSON.stringify(result), 'OCR Configs');
  }

  async openHTMLCameraPage() {
    if (this.platform.is('ios')) {
      await this.dialogsService.showAlert('HTML5 Camera is an Android-only feature');
      return;
    }

    await this.router.navigateByUrl('/html5-camera');
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


    const loading = await this.dialogsService.createLoading('Detecting barcodes...');
    await loading.present();
    const result = await this.scanbotService.SDK.detectBarcodesOnImage(
        { imageFileUri: imageUri, barcodeFormats: BarcodeListService.getAcceptedTypes() }
        );
    BarcodeListService.detectedBarcodes = result.barcodes;
    BarcodeListService.snappedImage = imageUri;
    await loading.dismiss();
    await this.router.navigateByUrl('/barcode-result-list');
  }

  hasHtml5CameraSupport() {
    return this.platform.is('android');
  }

}
