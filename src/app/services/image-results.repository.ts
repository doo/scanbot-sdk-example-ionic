import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Page } from 'cordova-plugin-scanbot-sdk';
import { ScanbotSdkDemoService } from './scanbot-sdk-demo.service';


@Injectable()
export class ImageResultsRepository {

    private pages: Page[] = [];

    constructor(private sanitizer: DomSanitizer,
                private storage: Storage,
                private platform: Platform,
                private scanbotService: ScanbotSdkDemoService) {
        this.platform.ready().then(() => this.loadPagesFromStorage());
    }

    private async loadPagesFromStorage() {
        const val = await this.storage.get('pages');
        const storedPages: Page[] = val ? val as Page[] : [];
        if (storedPages.length === 0) {
            this.pages = [];
            return;
        }
        this.scanbotService.ready().then(async () => {
            const result = await this.scanbotService.SDK.refreshImageUris({pages: storedPages});
            this.pages = result.pages;
        });
    }

    private async storePagesInStorage() {
        await this.storage.set('pages', this.pages);
    }

    public getPages(): Page[] {
        return this.pages;
    }

    public getPageById(id: string) {
        return this.pages.find(p => p.pageId === id);
    }

    public async addPages(pages: Page[]) {
        this.pages = this.pages.concat(pages);
        await this.storePagesInStorage();
    }

    public async updatePage(page: Page) {
        let replaced = false;
        for (let i = 0; i < this.pages.length; ++i) {
            if (this.pages[i].pageId === page.pageId) {
                this.pages[i] = page;
                replaced = true;
                break;
            }
        }
        if (!replaced) {
            this.pages.push(page);
        }
        await this.storePagesInStorage();
    }

    public async removePage(page: Page) {
        const index = this.pages.findIndex(p => p.pageId === page.pageId);
        if (index > -1) {
            this.pages.splice(index, 1);
        }
        await this.storePagesInStorage();
    }

    public async removeAllPages() {
        this.pages = [];
        await this.storePagesInStorage();
    }

    public sanitizeFileUri(fileUri: string): string {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        const url = (<any>window).Ionic.WebView.convertFileSrc(fileUri);
        // see https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustUrl(url) as string;
    }

    public sanitizeBase64(data: string): string {
        // Cf https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustResourceUrl( data) as string;
    }
}
