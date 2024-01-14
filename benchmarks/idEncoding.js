"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tinybench_1 = require("tinybench");
var suite = new tinybench_1.Bench();
// Base-62 Encoding and Decoding
var charactersStr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
var charactersArr = charactersStr.split('');
function encodeStr(num) {
    var encoded = '';
    while (num > 0) {
        var remainder = num % 64;
        encoded = charactersStr.charAt(remainder) + encoded;
        num = Math.floor(num / 64);
    }
    return encoded;
}
function encodeArr(num) {
    var encoded = '';
    while (num > 0) {
        var remainder = num % 64;
        encoded = charactersArr[remainder] + encoded;
        num = Math.floor(num / 64);
    }
    return encoded;
}
function decodeStr(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
        num = num * 64 + charactersStr.indexOf(str.charAt(i));
    }
    return num;
}
function decodeArr(str) {
    var num = 0;
    for (var i = 0; i < str.length; i++) {
        num = num * 64 + charactersArr.indexOf(str.charAt(i));
    }
    return num;
}
// Benchmark Suite
suite
    .add('Base64 Encode Str', function () {
    encodeStr(123456789);
})
    .add('Base64 Decode Str', function () {
    decodeStr('7mYQl');
})
    .add('Base64 Encode Arr', function () {
    encodeArr(123456789);
})
    .add('Base64 Decode Arr', function () {
    decodeArr('7mYQl');
})
    .add('Base36 Encode', function () {
    (123456789).toString(36);
})
    .add('Base36 Decode', function () {
    parseInt('21i3v9', 36);
});
suite.run()
    //   .then(() => suite.run())
    .then(function () { return console.table(suite.table()); });
