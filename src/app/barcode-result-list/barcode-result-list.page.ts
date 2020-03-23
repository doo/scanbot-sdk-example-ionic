import { Component, OnInit } from '@angular/core';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {ImageResultsRepository} from '../services/image-results.repository';
import {DialogsService} from '../services/dialogs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionSheetController} from '@ionic/angular';
import {BarcodeListService} from '../services/barcode-list.service';

@Component({
  selector: 'app-barcode-result-list',
  templateUrl: './barcode-result-list.page.html',
  styleUrls: ['./barcode-result-list.page.scss'],
})
export class BarcodeResultListPage {

  barcodes = [];

  constructor(private scanbotService: ScanbotSdkDemoService,
              private imageResultsRepository: ImageResultsRepository,
              private dialogsService: DialogsService,
              private router: Router,
              private route: ActivatedRoute,
              private actionSheetController: ActionSheetController) {

    this.barcodes = BarcodeListService.detectedBarcodes;
    console.log("constructor:", this.barcodes);
  }

}
