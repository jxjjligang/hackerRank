'use strict'

// Complete the twoStrings function below.
function twoStrings(s1, s2) {
    let s1_distinctChars= new Set(s1.split('')), s2_distinctChars= new Set(s2.split(''));
    for(let char of s1_distinctChars.keys()){
        if (s2_distinctChars.has(char))
            return 'YES';
    }

    return 'NO';
}

main();
function main() {
    let input = `2
    hello
    world
    hi
    world`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const q = parseInt(lines[index++], 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const s1 = lines[index++], s2 = lines[index++];

        let result = twoStrings(s1, s2);
        console.log(result + "\n");
    }
}