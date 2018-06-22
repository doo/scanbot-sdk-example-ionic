import { Component, ChangeDetectorRef } from '@angular/core';
import { normalizeURL, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import ScanbotSdk, { Page } from 'cordova-plugin-scanbot-sdk'
import SdkInitializer from '../../services/sdk-initializer';

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
  ) {
    sdkInitializer.onInitialize(err => {
      if (err) {
        this.showAlert(err.message);
      } else {
        this.reloadStoredPages();
      }
    });
  }

  public async pickImageFromGallery() {
    var options = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    const originalImageFileUri: string = await this.camera.getPicture(options);
    this.updatePage(await SBSDK.createPage({originalImageFileUri}));
  }

  public async startCameraUi() {
    const result = await SBSDK.UI.startDocumentScanner({
      uiConfigs: {
        multiPageButtonTitle: 'Snap multiple'
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
        backgroundColor: '#FF0000',
      }
    });

    if (result.status == 'CANCELED') {
      return;
    }

    this.updatePage(result.page);
  }

  public async rotateImage(times: number) {
    if (!this.checkSelectedPage()) return;

    const rotatedPage = await SBSDK.rotatePage({
      page: this.selectedPage,
      times,
    });
    this.updatePage(rotatedPage);
  }

  public async binarize() {
    if (!this.checkSelectedPage()) return;
    const newPage = await SBSDK.applyImageFilterOnPage({
      page: this.selectedPage,
      imageFilter: 'BINARIZED'
    });
    this.updatePage(newPage);
  }

  public async autoCrop() {
    if (!this.checkSelectedOriginal()) return;
    this.updatePage(await SBSDK.detectDocumentOnPage({page: this.selectedPage}));
  }

  public async performOcr() {
    if (!this.checkSelectedPage()) return;
    const result = await SBSDK.performOcr({
      images: [this.selectedPage.documentImageFileUri],
      languages: ['en','de'],
      outputFormat: 'PLAIN_TEXT',
    });
    this.showAlert(result.plainText, "OCR");
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
    const result = await SBSDK.UI.startMrzScanner();
    if (result.status == 'OK') {
      const fields = result.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      this.showAlert(fields.join(''), 'MRZ');
    }
  }

  public async startBarcodeScannerUi() {
    const result = await SBSDK.UI.startBarcodeScanner();
    if (result.status == 'OK') {
      this.showAlert(result.barcodeResult.textValue, `Barcode: ${result.barcodeResult.barcodeFormat}`);
    }
  }

  public async removePage() {
    if (!this.checkSelectedOriginal()) return;

    await SBSDK.removePage(this.selectedPage);
    this.reloadStoredPages();
  }

  public async cleanup() {
    await SBSDK.cleanup();
    this.reloadStoredPages();
  }

  public async reloadStoredPages() {
    const result = await SBSDK.getStoredPages();
    console.log(JSON.stringify(result));
    this.pages = result.pages;
    this.selectedPage = this.pages[this.pages.length - 1];
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
