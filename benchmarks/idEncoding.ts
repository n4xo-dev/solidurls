import { Bench } from 'tinybench';

const suite = new Bench();

// Base-62 Encoding and Decoding
const charactersStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const charactersArr = charactersStr.split('');

function encodeStr(num: number): string {
    let encoded = '';
    while (num > 0) {
        let remainder = num % 64;
        encoded = charactersStr.charAt(remainder) + encoded;
        num = Math.floor(num / 64);
    }
    return encoded;
}

function encodeArr(num: number): string {
    let encoded = '';
    while (num > 0) {
        let remainder = num % 64;
        encoded = charactersArr[remainder] + encoded;
        num = Math.floor(num / 64);
    }
    return encoded;
}

function decodeStr(str: string): number {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * 64 + charactersStr.indexOf(str.charAt(i));
    }
    return num;
}

function decodeArr(str: string): number {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num = num * 64 + charactersArr.indexOf(str.charAt(i));
    }
    return num;
}

// Benchmark Suite
suite
.add('Base64 Encode Str', () => {
    encodeStr(123456789);
})
.add('Base64 Decode Str', () => {
    decodeStr('7mYQl');
})
.add('Base64 Encode Arr', () => {
    encodeArr(123456789);
})
.add('Base64 Decode Arr', () => {
    decodeArr('7mYQl');
})
.add('Base36 Encode', () => {
    (123456789).toString(36);
})
.add('Base36 Decode', () => {
    parseInt('21i3v9', 36);
})

suite.run()
//   .then(() => suite.run())
  .then(() => console.table(suite.table()));

