import { Component } from '@angular/core';
import { BarcodeListService } from '../services/barcode-list.service';
import { BarcodeFormat } from 'cordova-plugin-scanbot-sdk';

@Component({
    selector: 'app-barcode-list',
    templateUrl: 'barcode-list.page.html',
})
export class BarcodeListPage {

    barcodes: Array<{ key: BarcodeFormat, value: boolean }>  = [];

    constructor() {
        this.barcodes = BarcodeListService.items;
    }

    onChange($event: CustomEvent) {
        const format = $event.detail.value;
        const isChecked = $event.detail.checked;
        BarcodeListService.update(format, isChecked);
    }
}
