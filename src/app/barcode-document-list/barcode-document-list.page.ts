import { Component, NgZone } from '@angular/core';
import { BarcodeDocumentListService } from '../services/barcode-document-list.service';
import { BarcodeDocumentFormat } from 'cordova-plugin-scanbot-sdk';

@Component({
    selector: 'app-barcode-document-list',
    templateUrl: 'barcode-document-list.page.html',
})
export class BarcodeDocumentListPage {

    documentTypes: Array<{ key: BarcodeDocumentFormat, value: boolean }> = [];
    isFilteringEnabled: boolean;

    constructor(private ngZone: NgZone) {
        this.documentTypes = BarcodeDocumentListService.list;
        this.isFilteringEnabled = BarcodeDocumentListService.isFilteringEnabled;
    }

    onChange($event: CustomEvent) {
        const key = $event.detail.value;
        const value = $event.detail.checked;
        BarcodeDocumentListService.update(key, value);
    }

    onEnabledChange($event: CustomEvent) {
        BarcodeDocumentListService.isFilteringEnabled = $event.detail.checked;
        this.ngZone.run(() => {
            this.isFilteringEnabled = BarcodeDocumentListService.isFilteringEnabled;
        });
    }
}
