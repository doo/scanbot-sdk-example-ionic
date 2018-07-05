import { Component, ChangeDetectorRef } from '@angular/core';
import { normalizeURL, AlertController, Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import ScanbotSdk, { Page, MrzScannerConfiguration, BarcodeScannerConfiguration } from 'cordova-plugin-scanbot-sdk'
import SdkInitializer, { IMAGE_QUALITY } from '../../services/sdk-initializer';

const SBSDK = ScanbotSdk.promisify();

@Component({
  selector: 'page-sdk-ui',
  templateUrl: 'sdk-ui.html'
})
export class SdkUiPage {

  public currentDocumentImageUri: string = '';
  public currentOriginalImageUri: string = '';
  public pdfFileUri: string = '';
  public barcodeResult: string = '';

  public pages: Page[] = [];
  public selectedPage: Page;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private alertCtrl: AlertController,
    sdkInitializer: SdkInitializer,
    private camera: Camera,
    private platform: Platform
  ) {
    sdkInitializer.onInitialize(err => {
      if (err) {
        this.showAlert(err.message);
      } else {
        // ...
      }
    });
  }

  public async pickImageFromGallery() {
    let options = {
      quality: IMAGE_QUALITY,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    const originalImageFileUri: string = await this.camera.getPicture(options);
    const result = await SBSDK.createPage({originalImageFileUri});
    this.updatePage(result.page);
  }

  public async startCameraUi() {
    const result = await SBSDK.UI.startDocumentScanner({
      uiConfigs: {
        // Customize colors, text resources, etc..
        cameraPreviewMode: "FIT_IN",
        orientationLockMode: "PORTRAIT",
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
    if (!this.checkSelectedOriginal()) return;

    const result = await SBSDK.UI.startCroppingScreen({
      page: this.selectedPage,
      uiConfigs: {
        // Customize colors, text resources, etc..
        //backgroundColor: '#FF0000',
        //...
      }
    });

    if (result.status == 'CANCELED') {
      return;
    }

    this.updatePage(result.page);
  }

  public async rotatePage(times: number) {
    if (!this.checkSelectedPage()) return;

    const result = await SBSDK.rotatePage({
      page: this.selectedPage,
      times,
    });
    this.updatePage(result.page);
  }

  public async binarize() {
    if (!this.checkSelectedPage()) return;
    const result = await SBSDK.applyImageFilterOnPage({
      page: this.selectedPage,
      imageFilter: 'BINARIZED'
    });
    this.updatePage(result.page);
  }

  public async autoCrop() {
    if (!this.checkSelectedOriginal()) return;
    const result = await SBSDK.detectDocumentOnPage({page: this.selectedPage});
    this.updatePage(result.page);
  }

  public async performOcr() {
    if (!this.checkSelectedPage()) return;
    const result = await SBSDK.performOcr({
      images: [this.selectedPage.documentImageFileUri],
      languages: ['en'],
      outputFormat: 'PLAIN_TEXT',
    });
    this.showAlert(result.plainText, "OCR result");
  }

  public async createPdf() {
    if (!this.checkSelectedPage()) return;
    if (!this.checkAllPagesHaveDocuments()) return;

    const result = await SBSDK.createPdf({images: this.pages.map(p => p.documentImageFileUri)});
    this.showAlert(result.pdfFileUri, "PDF created");
  }

  public async writeTiff() {
    if (!this.checkSelectedPage()) return;
    if (!this.checkAllPagesHaveDocuments()) return;

    const result = await SBSDK.writeTiff({images: this.pages.map(p => p.documentImageFileUri), oneBitEncoded: true});
    this.showAlert(result.tiffFileUri, "TIFF created");
  }

  public async startMrzScanner() {
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
      this.showAlert(fields.join(''), 'MRZ');
    }
  }

  public async startBarcodeScannerUi() {
    let config: BarcodeScannerConfiguration = {
      finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.'
    };
    const result = await SBSDK.UI.startBarcodeScanner({uiConfigs: config});
    if (result.status == 'OK') {
      this.showAlert(result.barcodeResult.textValue, `Barcode: ${result.barcodeResult.barcodeFormat}`);
    }
  }

  public async removePage() {
    if (!this.checkSelectedOriginal()) return;

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
    return normalizeURL(imageFileUri);
  }

  public onImagePreviewTapped(page: Page) {
    this.selectedPage = page;
    this.changeDetector.detectChanges();
  }

  private checkSelectedPage() {
    if (this.selectedPage && this.selectedPage.documentImageFileUri) {
      return true;
    } else {
      this.showAlert(this.selectedPage ? "The selected page has not yet been cropped. Crop it and try again."
        : "No page selected. Snap a document photo or crop a picture from the gallery");
      return false;
    }
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

  private checkSelectedOriginal() {
    if (this.selectedPage) {
      return true;
    } else {
      this.showAlert("Snap a picture of a document or select a picture from the phone's gallery");
      return false
    }
  }

  private checkAllPagesHaveDocuments() {
    let every = true;
    this.pages.forEach(p => {
      if (!p.documentImageFileUri) {
        every = false;
      }
    });
    if (this.pages.length == 0 || !every) {
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
}
