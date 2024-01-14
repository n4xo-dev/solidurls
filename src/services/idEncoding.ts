// Base64 Encode 

const charactersStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

export function encode(num: number): string {
    let encoded = '';
    while (num > 0) {
        let remainder = num % 64;
        encoded = charactersStr.charAt(remainder) + encoded;
        num = Math.floor(num / 64);
    }
    return encoded;
}

export function decode(str: string): number {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * 64 + charactersStr.indexOf(str.charAt(i));
    }
    return num;
}