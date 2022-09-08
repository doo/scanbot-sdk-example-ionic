
export class ByteArrayUtils {
	static toHex(rawBytes: number[]): string {
		return Array.from(rawBytes, function(byte) {
		  return ('0' + (byte & 0xFF).toString(16)).slice(-2);
		}).join('')
	}

	static fromHex(hex: string): number[] {
		let bytes = [];
		for (let c = 0; c < hex.length; c += 2) {
			bytes.push(parseInt(hex.substring(c, c + 2), 16));
		}
		return bytes;
	}

	static toBase64(rawBytes: number[]): string {
		const bytes = new Uint8Array(rawBytes);
		const len = bytes.byteLength;
		let binary = '';
		for (let i = 0; i < len; i++) {
		    binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}

	static fromBase64(base64: string): number[] {
		let binary_string = window.atob(base64);
		let len = binary_string.length;
		let bytes = new Uint8Array(len);
		for (let i=0; i<len; i++) {
			bytes[i] = binary_string.charCodeAt(i);
		}
		return Array.from(bytes);
	}

	static toString(rawBytes: number[]): string {
		return String.fromCharCode(...rawBytes);
	}

	static fromString(str: string): number[] {
		const bytes = [];
		for(let i=0; i<str.length; i++) {
			const code = str.charCodeAt(i);
			bytes.push(code);
		}
		return bytes;
	}
}