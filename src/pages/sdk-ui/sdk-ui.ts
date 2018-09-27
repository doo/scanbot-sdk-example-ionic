import { Component, ChangeDetectorRef } from '@angular/core';
import {
  normalizeURL,
  AlertController,
  Platform,
  ActionSheetController,
  NavController,
  LoadingController
} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import ScanbotSdk, { Page, MrzScannerConfiguration, BarcodeScannerConfiguration } from 'cordova-plugin-scanbot-sdk'
import SdkInitializer, { IMAGE_QUALITY } from '../../services/sdk-initializer';
import { PageFilterPage } from "./filter";

const SBSDK = ScanbotSdk.promisify();

@Component({
  selector: 'page-sdk-ui',
  templateUrl: 'sdk-ui.html'
})
export class SdkUiPage {

  public pages: Page[] = [];
  public selectedPage: Page;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertCtrl: AlertController,
    sdkInitializer: SdkInitializer,
    private camera: Camera,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {
    sdkInitializer.onInitialize(err => {
      if (err) {
        this.showAlert(err.message);
      } else {
        // ...
      }
    });
  }

  private createLoading(message: string) {
    return this.loadingCtrl.create({
      content: message
    });
  }

  public async pickImageFromGallery() {
    let options = {
      quality: IMAGE_QUALITY,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    const originalImageFileUri: string = await this.camera.getPicture(options);

    if (!(await this.checkLicense())) { return; }

    let loading = this.createLoading('Auto-detecting and cropping...');
    try {
      loading.present();
      // First create a new page with the selected original image file:
      const createResult = await SBSDK.createPage({originalImageFileUri});
      // and then run auto document detection and cropping on this new page:
      const docResult = await SBSDK.detectDocumentOnPage({page: createResult.page});
      this.updatePage(docResult.page);
    } finally {
      loading.dismiss();
    }
  }

  public async startCameraUi() {
    if (!(await this.checkLicense())) { return; }

    const result = await SBSDK.UI.startDocumentScanner({
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        cameraPreviewMode: 'FIT_IN',
        orientationLockMode: 'PORTRAIT',
        pageCounterButtonTitle: '%d Page(s)'
        //...
      }
    });

    if (result.status == 'CANCELED') {
      return;
    }

    this.pages = this.pages.concat(result.pages);
    this.selectedPage = this.pages[this.pages.length - 1];
    this.changeDetector.detectChanges();
  }

  public async startCroppingUi() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkSelectedPage()) { return; }

    const result = await SBSDK.UI.startCroppingScreen({
      page: this.selectedPage,
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        orientationLockMode: 'PORTRAIT',
        //...
      }
    });

    if (result.status == 'CANCELED') {
      return;
    }

    this.updatePage(result.page);
  }

  public async rotatePage(times: number) {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkSelectedPage()) { return; }

    let loading = this.createLoading('Rotating Page...');
    try {
      loading.present();
      const result = await SBSDK.rotatePage({page: this.selectedPage, times});
      this.updatePage(result.page);
    } finally {
      loading.dismiss();
    }
  }

  public async performOcr() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkAllPagesHaveDocuments()) { return; }

    let loading = this.createLoading('Performing OCR ...');
    try {
      loading.present();
      const result = await SBSDK.performOcr({
        images: this.pages.map(p => p.documentImageFileUri),
        languages: ['en'],
        outputFormat: 'FULL_OCR_RESULT',
      });
      this.showAlert(result.plainText, "OCR result");
    } finally {
      loading.dismiss();
    }
  }

  public async createPdf() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkAllPagesHaveDocuments()) { return; }

    let loading = this.createLoading('Creating PDF ...');
    try {
      loading.present();
      const result = await SBSDK.createPdf({images: this.pages.map(p => p.documentImageFileUri)});
      this.showAlert(result.pdfFileUri, "PDF created");
    } finally {
      loading.dismiss();
    }
  }

  public async writeTiff() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkAllPagesHaveDocuments()) { return; }

    let loading = this.createLoading('Creating TIFF ...');
    try {
      loading.present();
      const result = await SBSDK.writeTiff({images: this.pages.map(p => p.documentImageFileUri), oneBitEncoded: true});
      this.showAlert(result.tiffFileUri, "TIFF created");
    } finally {
      loading.dismiss();
    }
  }

  public async startMrzScanner() {
    if (!(await this.checkLicense())) { return; }

    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.platform.is('ios')) {
      let widthPx = window.screen.width;
      config.finderWidth = widthPx * 0.9;
      config.finderHeight = widthPx * 0.18;
    }

    const result = await SBSDK.UI.startMrzScanner({uiConfigs: config});
    if (result.status == 'OK') {
      const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      this.showAlert(fields.join(''), 'MRZ Result');
    }
  }

  public async startBarcodeScannerUi() {
    if (!(await this.checkLicense())) { return; }

    let config: BarcodeScannerConfiguration = {
      finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.'
    };
    const result = await SBSDK.UI.startBarcodeScanner({uiConfigs: config});
    if (result.status == 'OK') {
      this.showAlert(result.barcodeResult.textValue, `Barcode: ${result.barcodeResult.barcodeFormat}`);
    }
  }

  public async removePage() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkSelectedPage()) { return; }

    await SBSDK.removePage({page: this.selectedPage});

    let pageIndexToRemove = null;
    this.pages.forEach((p, index) => {
      if (this.selectedPage.pageId === p.pageId) {
        pageIndexToRemove = index;
      }
    });
    this.pages.splice(pageIndexToRemove, 1);
    this.selectedPage = null;
    this.changeDetector.detectChanges();
  }

  public async cleanup() {
    await SBSDK.cleanup();
    this.pages = [];
    this.selectedPage = null;
    this.changeDetector.detectChanges();
  }

  public normalizeImageFileUri(imageFileUri: string) {
    // normalizeURL - see https://ionicframework.com/docs/wkwebview/
    return normalizeURL(imageFileUri);
  }

  public onImagePreviewTapped(page: Page) {
    this.selectedPage = page;
    this.changeDetector.detectChanges();
  }

  private updatePage(page: Page) {
    let replaced = false;
    for (let i = 0; i < this.pages.length; ++i) {
      if (this.pages[i].pageId == page.pageId) {
        this.pages[i] = page;
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      this.pages.push(page);
    }
    this.selectedPage = page;
    this.changeDetector.detectChanges();
  }

  private async checkLicense() {
    const result = await SBSDK.isLicenseValid();
    if (result.isLicenseValid == true) {
      // OK - trial session, valid trial license or valid production license.
      return true;
    }
    this.showAlert("Scanbot SDK (trial) license has expired!");
    return false;
  }

  private checkSelectedPage() {
    if (this.selectedPage && this.selectedPage.documentImageFileUri) {
      return true;
    } else {
      this.showAlert(this.selectedPage ? "The selected page has not yet been cropped. Crop it and try again."
        : "No page selected. Please snap an image via Document Scanner or select one from the phone's gallery.");
      return false;
    }
  }

  private checkAllPagesHaveDocuments() {
    if (this.pages.length == 0) {
      this.showAlert("Please snap some images via Document Scanner or select from the phone's gallery.");
      return false;
    }

    let every = true;
    this.pages.forEach(p => {
      if (!p.documentImageFileUri) {
        every = false;
      }
    });
    if (!every) {
      this.showAlert("Some pages have not yet been cropped. Crop all uncropped pages and try again.");
      return false;
    }

    return true;
  }

  private showAlert(message: string, title: string = "Alert") {
    const prompt = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    prompt.present();
  }

  public async presentPageEditActionsSheet() {
    if (!(await this.checkLicense())) { return; }
    if (!this.checkSelectedPage()) { return; }

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Edit selected Page',
      buttons: [
        {
          text: 'Crop/Rotate (Cropping UI)',
          icon: 'ios-crop',
          handler: () => {
            this.startCroppingUi();
          }
        },
        {
          text: 'Apply Image Filter',
          icon: 'contrast',
          handler: () => {
            this.openPageFilterPage(this.selectedPage);
          }
        },
        {
          text: 'Rotate Clockwise',
          icon: 'ios-redo',
          handler: () => {
            this.rotatePage(-1);
          }
        },
        {
          text: 'Rotate Counter-Clockwise',
          icon: 'ios-undo',
          handler: () => {
            this.rotatePage(1);
          }
        },
        {
          text: 'Delete Page',
          icon: 'trash',
          handler: () => {
            this.removePage();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  private openPageFilterPage(page: Page) {
    if (!this.checkSelectedPage()) return;

    new Promise<{page: Page}>((resolve, reject) => {
      this.navCtrl.push(PageFilterPage, {page: page, resolve: resolve});
    }).then(data => {
      this.updatePage(data.page);
    });
  }

}
