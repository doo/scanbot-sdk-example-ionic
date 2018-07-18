import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController, NavParams, LoadingController, normalizeURL } from 'ionic-angular';

import ScanbotSdk, { Page, ImageFilter } from 'cordova-plugin-scanbot-sdk'

const SBSDK = ScanbotSdk.promisify();

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html'
})
export class PageFilterPage {

  public page: Page;
  public imgUri: string;

  public imageFilterList: ImageFilter[] = [
    "NONE",
    "COLOR_ENHANCED",
    "GRAYSCALE",
    "BINARIZED",
    "COLOR_DOCUMENT",
    "PURE_BINARIZED",
    "BACKGROUND_CLEAN",
    "BLACK_AND_WHITE"
  ];
  public selectedFilter: ImageFilter;


  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private changeDetector: ChangeDetectorRef,
              private loadingCtrl: LoadingController
  ) {
    this.page = this.navParams.data.page;
    this.selectedFilter = this.page.filter || "NONE";
    this.getFilteredDocumentPreviewUri(this.selectedFilter);
  }

  private createLoading(message: string) {
    return this.loadingCtrl.create({
      content: message
    });
  }

  public normalizeImageFileUri(imageFileUri: string) {
    // normalizeURL - see https://ionicframework.com/docs/wkwebview/
    return normalizeURL(imageFileUri);
  }

  public onFilterSelected() {
    this.getFilteredDocumentPreviewUri(this.selectedFilter);
  }

  public async getFilteredDocumentPreviewUri(filter: ImageFilter) {
    let loading = this.createLoading('Rendering preview...');
    try {
      loading.present();
      const result = await SBSDK.getFilteredDocumentPreviewUri({page: this.page, imageFilter: filter});
      this.imgUri = result.imageFileUri;
      this.changeDetector.detectChanges();
    } finally {
      loading.dismiss();
    }
  }

  public async applyImageFilter() {
    let loading = this.createLoading('Applying image filter...');
    try {
      loading.present();
      const result = await SBSDK.applyImageFilterOnPage({page: this.page, imageFilter: this.selectedFilter});
      // resolve updated page:
      this.navCtrl.pop().then(() => this.navParams.data.resolve({page: result.page}));
    } finally {
      loading.dismiss();
    }
  }

}
