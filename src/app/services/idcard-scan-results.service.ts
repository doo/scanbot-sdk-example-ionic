import { Injectable } from '@angular/core';
import { IdCardField, IdCardScannerResult } from 'cordova-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root',
})
export class IdCardScanResultsService {
    public static fields = {};
}
