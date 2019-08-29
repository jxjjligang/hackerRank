'use strict'

// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    function createMap(words) {
        let word2Count = new Map();
        words.forEach(word => {
            let count = 1;
            if (word2Count.has(word))
                count += word2Count.get(word);

            word2Count.set(word, count);
        });

        return word2Count;
    }

    let magazineMap = createMap(magazine), noteMap = createMap(note);
    for (let word of noteMap.keys()) {
        if (!magazineMap.has(word) || magazineMap.get(word) < noteMap.get(word)) {
            console.log('No');
            return;
        }
    }

    console.log('Yes');
}

main();
function main() {
    let input = `7 4
    ive got a lovely bunch of coconuts
    ive got some coconuts`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const mn = lines[index++].split(' '), m = parseInt(mn[0], 10), n = parseInt(mn[1], 10);
    const magazine = lines[index++].split(' '), note = lines[index++].split(' ');

    checkMagazine(magazine, note);
}