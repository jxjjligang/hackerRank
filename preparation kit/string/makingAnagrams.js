'use strict'

function makeAnagram(a, b) {
    function getChar2Amount(str) {
        let char2Amount = new Map();
        for (let i = 0; i < str.length; i++) {
            let char = str[i], count = (char2Amount.has(char) ? 1 + char2Amount.get(char) : 1);
            char2Amount.set(char, count)
        }

        return char2Amount;
    }

    let aMap = getChar2Amount(a), bMap = getChar2Amount(b);
    let commonAmount = 0;
    for (let kv of aMap) {
        let char = kv[0], aAmount = kv[1];
        if (bMap.has(char))
            commonAmount += Math.min(aAmount, bMap.get(char))
    }

    return a.length + b.length - 2 * commonAmount;
}

main();
function main() {
    let input = `cde
    abc`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const a = lines[index++], b = lines[index++];

    const res = makeAnagram(a, b);
    console.log(res);
}