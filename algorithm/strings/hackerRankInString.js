'use strict'

// Complete the hackerrankInString function below.
function hackerrankInString(s) {
    const SEARCH_STRING = 'hackerrank';

    let foundChars = [], searchIdx = 0;
    for (let i = 0; i < s.length; i++) {
        let char = s[i];
        if (char === SEARCH_STRING[searchIdx]) {
            foundChars.push(char)
            searchIdx++;
        }

        if (foundChars.length === SEARCH_STRING.length)
            return 'YES';
    }

    return 'NO';
}

main();
function main() {
    let input = `2
    hhaacckkekraraannk
    rhbaasdndfsdskgbfefdbrsdfhuyatrjtcrtyytktjjt`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const q = parseInt(lines[index++], 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = lines[index++];
        let result = hackerrankInString(s);
        console.log(result + "\n");
    }
}