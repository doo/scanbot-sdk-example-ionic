import { Component } from '@angular/core';
import { IdCardScanResultsService } from '../services/idcard-scan-results.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-idcard-scan-results',
    templateUrl: './idcard-scan-results.page.html',
    styleUrls: ['./idcard-scan-results.page.scss'],
})
export class IdCardScanResultsPage {

    fields: any;
    displayFields: {};
    photoUri: string;

    constructor(public sanitizer: DomSanitizer) {
        this.fields = IdCardScanResultsService.fields;
        this.displayFields = {};
        this.setupProperties();
    }

    private setupProperties() {
        // Setup Photo Image URI from result Fields
        const photoImageUri = this.fields.photoImageUri;
        if (photoImageUri) {
            this.photoUri = this.sanitizeFileUri(photoImageUri);
        }

        // Setup Key - Value entries from result Fields
        Object.keys(this.fields).forEach((key) => {
            const value = this.fields[key];
            let out;

            if (value["text"]) {
                out = value["text"];
                if (value["confidence"]) {
                    let percentage = Math.round(value["confidence"] * 100);
                    out += "\n(confidence: " + percentage + "%)";
                }
            } else if (typeof value === 'string' || value instanceof String) {
                out = value;
            }

            if (out) {
                this.displayFields[key] = out;
            }
        });
    }

    private sanitizeFileUri(fileUri: string): string {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
        // see https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustUrl(convertedUri) as string;
    }
}
