import { Injectable } from '@angular/core';
import { CheckRecognizerResult } from 'cordova-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root',
})
export class CheckRecognizerResultsService {
    public static checkRecognizerResult: CheckRecognizerResult = {};
}
