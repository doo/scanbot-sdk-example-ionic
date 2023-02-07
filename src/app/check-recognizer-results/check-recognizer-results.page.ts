import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CheckRecognizerResult } from 'cordova-plugin-scanbot-sdk';
import { CheckRecognizerResultsService } from '../services/check-recognizer-results.service';

@Component({
    selector: 'app-check-recognizer-results',
    templateUrl: './check-recognizer-results.page.html',
})
export class CheckRecognizerResultsPage {
    checkResult: CheckRecognizerResult;
    displayFields: {};
    photoUri: string;

    constructor(public sanitizer: DomSanitizer, ) {
        this.checkResult = CheckRecognizerResultsService.checkRecognizerResult;
        this.displayFields = {};
        this.setupProperties();
    }

    private setupProperties() {
        // Setup Photo Image URI from result Fields
        const photoImageUri = this.checkResult.imageUri;
        if (photoImageUri) {
            this.photoUri = this.sanitizeFileUri(photoImageUri);
        }

        // Setup Key - Value entries from result Fields
        Object.keys(this.checkResult.fields).forEach((key) => {
            const value = this.checkResult.fields[key].value;
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
