'use strict'

// Complete the alternatingCharacters function below.
function alternatingCharacters(s) {
    let count = 0, char = s[0];
    for (let i = 1; i < s.length; i++) {
        if (s[i] === char)
            count++;
        else
            char = s[i];
    }

    return count;
}

main();
function main() {
    let input = `5
    AAAA
    BBBBB
    ABABABAB
    BABABA
    AAABBB`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const q = parseInt(lines[index++], 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const s = lines[index++];
        let result = alternatingCharacters(s);
        console.log(result);
    }
}