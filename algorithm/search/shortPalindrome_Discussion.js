'use strict'

main();


function shortPalindrome(s) {
    const CHARCODE_a = 'a'.charCodeAt(0), mod = Math.pow(10, 9) + 7;
    let arr1 = [], arr3 = [];
    for (let i = 0; i < 26; i++) {
        arr1[i] = 0;
        arr3[i] = 0;
    }

    let arr2 = [];
    for (let i = 0; i < 26; i++) {
        arr2[i] = [];
        for (let j = 0; j < 26; j++)
            arr2[i][j] = 0;
    }

    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        let index = s.charCodeAt(i) - CHARCODE_a;
        ans += (arr3[index] % mod);
        ans = ans % mod;
        for (let j = 0; j < 26; j++) {
            arr3[j] += (arr2[j][index] % mod);
            arr3[j] = arr3[j] % mod;
        }
        for (let j = 0; j < 26; j++) {
            arr2[j][index] += (arr1[j] % mod);
            arr2[j][index] = arr2[j][index] % mod;
        }

        arr1[index]++;
        arr1[index] = arr1[index] % mod;
    }

    return ans;
}

function main() {
    let inputs = [`baabababaaaababbbbbbabbbbabbbaaabaaabbbbaabbbbbbab`, `kkkkkkz`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const s = lines[index++];

        let result = shortPalindrome(s);
        console.log(result + "\n");
    }
}