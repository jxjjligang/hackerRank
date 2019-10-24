'use strict'

main();

function nimbleGame(s) {
    let xorResult = 0, stones;
    for (let i = 1; i < s.length; i++) {
        stones = (s[i] % 2 === 0 ? 0 : i);
        xorResult ^= stones;
    }

    return (xorResult !== 0 ? 'First' : 'Second');
}

function main() {
    let inputs = [`2
    5
    0 2 3 0 6
    4
    0 0 0 0`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);

            const s = lines[index++].split(' ').map(sTemp => parseInt(sTemp, 10));

            let result = nimbleGame(s);

            console.log(result + "\n");
        }
    }
}