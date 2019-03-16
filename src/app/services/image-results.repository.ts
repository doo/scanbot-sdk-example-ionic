import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Page } from 'cordova-plugin-scanbot-sdk';


@Injectable()
export class ImageResultsRepository {

    private pages: SanitizedPage[] = [];

    constructor(public sanitizer: DomSanitizer) { }

    public getPages(): SanitizedPage[] {
        return this.pages;
    }

    public getPageById(id: string) {
        return this.pages.find(p => p.pageId === id);
    }

    public addPages(pages: Page[]) {
        const spages: SanitizedPage[] = [];
        pages.forEach((p) => {
            spages.push(this.sanitizePage(p));
        });
        this.pages = this.pages.concat(spages);
    }

    public updatePage(page: Page): SanitizedPage {
        const sp = this.sanitizePage(page);
        let replaced = false;
        for (let i = 0; i < this.pages.length; ++i) {
            if (this.pages[i].pageId === sp.pageId) {
                this.pages[i] = sp;
                replaced = true;
                break;
            }
        }
        if (!replaced) {
            this.pages.push(sp);
        }
        return sp;
    }

    public removePage(page: SanitizedPage) {
        const index = this.pages.findIndex(p => p.pageId === page.pageId);
        if (index > -1) {
            this.pages.splice(index, 1);
        }
    }

    public removeAllPages() {
        this.pages = [];
    }

    private sanitizePage(page: Page): SanitizedPage {
        // see https://ionicframework.com/docs/building/webview/#file-protocol
        let url = (<any>window).Ionic.WebView.convertFileSrc(page.documentPreviewImageFileUri);

        // see https://angular.io/guide/security#bypass-security-apis
        url = this.sanitizer.bypassSecurityTrustUrl(url);

        const sp: SanitizedPage = page as SanitizedPage;
        sp.sanitizedDocumentPreviewImage = url;
        return sp;
    }

}

export interface SanitizedPage extends Page {
    sanitizedDocumentPreviewImage: string;
}
