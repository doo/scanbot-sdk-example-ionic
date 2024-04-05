import {Component, Input, OnInit} from '@angular/core';
import {Field} from 'cordova-plugin-scanbot-sdk';
import {IonicModule} from '@ionic/angular';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {SafeUrl} from '@angular/platform-browser';


export type ScanResultSectionData = {
  key: string;
  value?: string;
  image?: SafeUrl;
  field?: Field;
};

export type ScanResultSection = {
  title: string;
  data: ScanResultSectionData[];
};

export type ScanResultSectionList = Array<ScanResultSection>

@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss'],
    imports: [
        IonicModule,
        NgForOf,
        NgIf,
        NgOptimizedImage
    ],
    standalone: true
})
export class SectionListComponent  implements OnInit {

  @Input() sectionListData:ScanResultSectionList

  constructor() {
  }

  ngOnInit() {}

}
