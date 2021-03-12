import { Component, OnInit } from '@angular/core';
import { IdCardScanResultsService } from '../services/idcard-scan-results.service';
import { IdCardField } from 'cordova-plugin-scanbot-sdk';

@Component({
  selector: 'app-idcard-scan-results',
  templateUrl: './idcard-scan-results.page.html',
  styleUrls: ['./idcard-scan-results.page.scss'],
})
export class IdCardScanResultsPage {

  fields: {};
  displayFields: {};

  constructor() {
      this.fields = IdCardScanResultsService.fields;
      this.displayFields = {};
      Object.keys(this.fields).forEach((key) => {
        let value = this.fields[key];
        var out = value;

        if(value["text"]) {
          out = value["text"];
          if(value["confidence"]) {
            out += "\n(confidence: " + value["confidence"] + ")";
          }
        }

        this.displayFields[key] = out;
      });
  }
}
