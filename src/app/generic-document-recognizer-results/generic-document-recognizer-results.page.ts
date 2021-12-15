import { Component } from '@angular/core';
import { GenericDocumentRecognizerResultsService } from '../services/generic-document-recognizer-results.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-generic-document-recognizer-results',
    templateUrl: './generic-document-recognizer-results.page.html',
    styleUrls: ['./generic-document-recognizer-results.page.scss'],
})
export class GenericDocumentRecognizerResultsPage {

    fields: any;
    documentType: string;
    displayFields: {};
    photoUri: string;

    constructor(public sanitizer: DomSanitizer) {
        this.fields = GenericDocumentRecognizerResultsService.fields;
        this.documentType = GenericDocumentRecognizerResultsService.documentType;
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
