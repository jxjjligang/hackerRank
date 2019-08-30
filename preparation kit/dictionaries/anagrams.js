'use strict'

function sherlockAndAnagrams(s) {
    const a_to_z = 'abcdefghijklmnopqrstuvwxyz';
    const CHAR_TO_INDEX = new Map();
    for (let i = 0; i < 26; i++)
        CHAR_TO_INDEX.set(a_to_z[i], i);

    function constructCountArray() {
        let arr = [];
        for (let i = 0; i < 26; i++)
            arr.push(0);

        return arr;
    }

    function orderSubstring(s, start, substrLen, arr) {
        let orderedStr = '';
        for (let i = 0; i < arr.length; i++)
            arr[i] = 0;

        for (let i = start; i < start + substrLen; i++) {
            let char = s[i], index = CHAR_TO_INDEX.get(char);
            arr[index]++;
        }

        for (let i = 0; i < arr.length; i++) {
            let count = arr[i];
            if (count > 0)
                orderedStr += a_to_z[i].repeat(count);
        }

        return orderedStr;
    }

    if (s.length < 2)
        return 0;

    let count = 0, arr = constructCountArray();
    // Count Anagrams whose length from 2 to s.length - 1;
    let substrLen = 1;
    while (substrLen < s.length) {
        let substr2Count = new Map();
        for (let i = 0; i <= s.length - substrLen; i++) {
            let orderedStr = orderSubstring(s, i, substrLen, arr);
            let count = 1;
            if (substr2Count.has(orderedStr))
                count += substr2Count.get(orderedStr);
            substr2Count.set(orderedStr, count);
        }
        for(let cnt of substr2Count.values()){
            if (cnt > 1)
            count += cnt * (cnt - 1) / 2;
        }

        substrLen++;
    }

    return count;
}

main();
function main() {
    let input = `1
    cdcd`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const q = parseInt(lines[index++], 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = lines[index++];

        let result = sherlockAndAnagrams(s);

        console.log(result + "\n");
    }
}