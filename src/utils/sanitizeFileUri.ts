import {DomSanitizer} from '@angular/platform-browser';

export function sanitizeFileUri(fileUri: string, sanitizer: DomSanitizer) {
    // see https://ionicframework.com/docs/building/webview/#file-protocol
    const convertedUri = (window as any).Ionic.WebView.convertFileSrc(fileUri);
    console.log(convertedUri, 'Converted URI');
    // see https://angular.io/guide/security#bypass-security-apis
    const sanitizedURI = sanitizer.bypassSecurityTrustUrl(convertedUri);
    console.log(sanitizedURI, 'Sanitized URI');
    return sanitizedURI;
}
