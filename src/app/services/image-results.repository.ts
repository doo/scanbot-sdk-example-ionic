import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Page } from 'cordova-plugin-scanbot-sdk';


@Injectable()
export class ImageResultsRepository {

    private pages: Page[] = [];

    constructor(public sanitizer: DomSanitizer) { }

    public getPages(): Page[] {
        return this.pages;
    }

    public getPageById(id: string) {
        return this.pages.find(p => p.pageId === id);
    }

    public addPages(pages: Page[]) {
        this.pages = this.pages.concat(pages);
    }

    public updatePage(page: Page): Page {
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
        return page;
    }

    public removePage(page: Page) {
        const index = this.pages.findIndex(p => p.pageId === page.pageId);
        if (index > -1) {
            this.pages.splice(index, 1);
        }
    }

    public removeAllPages() {
        this.pages = [];
    }

    public sanitizeFileUri(fileUri: string): string {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        const url = (<any>window).Ionic.WebView.convertFileSrc(fileUri);
        // see https://angular.io/guide/security#bypass-security-apis
        return this.sanitizer.bypassSecurityTrustUrl(url) as string;
    }
}
