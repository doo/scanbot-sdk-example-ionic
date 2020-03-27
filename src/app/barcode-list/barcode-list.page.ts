import {Component} from '@angular/core';
import {ScanbotSdkDemoService} from '../services/scanbot-sdk-demo.service';
import {DialogsService} from '../services/dialogs.service';
import {ActionSheetController, Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {BarcodeListService} from '../services/barcode-list.service';
import {ImageResultsRepository} from '../services/image-results.repository';

@Component({
    selector: 'app-barcode-list',
    templateUrl: 'barcode-list.page.html',
})
export class BarcodeListPage {

    barcodes = [];

    constructor(private scanbotService: ScanbotSdkDemoService,
                private imageResultsRepository: ImageResultsRepository,
                private dialogsService: DialogsService,
                private router: Router,
                private route: ActivatedRoute,
                private actionSheetController: ActionSheetController) {

        this.barcodes = BarcodeListService.items;
    }

    onChange($event: CustomEvent) {
        const format = $event.detail.value;
        const isChecked = $event.detail.checked;
        BarcodeListService.update(format, isChecked);
    }
}
