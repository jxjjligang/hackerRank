'use strict'

main();



// Complete the encryption function below.
function encryption(s) {
    let str = s.split(' ').reduce((a, c) => a + c);
    let strLen = str.length, rowBound = Math.floor(Math.sqrt(strLen)), columnBound = Math.ceil(Math.sqrt(strLen));
    if (rowBound * columnBound < strLen)
        rowBound++;

    let chars = Array.from(str), finalArr = [];
    for (let i = 0; i < chars.length; i++) {
        let rowIndex = Math.floor(i / columnBound);
        if (finalArr[rowIndex] === undefined)
            finalArr[rowIndex] = [];

        let row = finalArr[rowIndex];
        row.push(chars[i]);
    }

    let results=[];
    for (let columnIdx = 0; columnIdx < columnBound; columnIdx++) {
        let columnStr = '';
        for (let rowIdx = 0; rowIdx < rowBound; rowIdx++) {
            let c = finalArr[rowIdx][columnIdx];
            if (c !== undefined)
                columnStr += c;
            else
                break;
        }
        results.push(columnStr);
    }

    return results.join(' ');
}

function main() {
    let inputs = [`haveaniceday`, `feedthedog`, `chillout`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;


        const s = lines[index++];

        let result = encryption(s);

        console.log(result + "\n");

    }
}
