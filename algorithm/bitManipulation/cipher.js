'use strict'

main();


// Complete the cipher function below.
function cipher(k, s) {
    let n = s.length - k + 1;       // n is the length of the original binary string

    let index = s.length - 1;
    let bits = [parseInt(s[index])], prevKBits = bits[0];     // prevKBits is the Xor result of previous k bits
    while (bits.length < n) {
        index--;
        let lastBit = parseInt(s[index]);
        let originalBit = lastBit ^ prevKBits;
        bits.push(originalBit);

        prevKBits ^= originalBit;
        if (bits.length >= k) {
            prevKBits ^= bits[bits.length - k];
        }

    }

    return bits.reverse().join('');
}

function main() {
    let inputs = [`7 4
    1110100110`,
        `6 2
    1110001`,
        `10 3
    1110011011`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10), s = lines[index++];

        let result = cipher(k, s);
        console.log(result + "\n");
    }
}

