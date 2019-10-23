'use strict'
main();

// Complete the gameOfStones function below.
function gameOfStones(n) {
    let stones = [2, 3, 5];
    let results = [false, true, true, true, true, true], result, index;     // true (First win), false (Second win)
    if (n <= 1)
        index = 0;
    else if (n <= 6)
        index = n - 1;
    else {  // n >= 7
        for (let number = 7; number <= n; number++) {
            index = number - 1, result = false;
            for (let i = 0; i < stones.length; i++) {
                let stone = stones[i];
                if (results[index - stone] === false) {
                    result = true;
                    break;
                }
            }
            results[index] = result;
        }
    }

    return results[index] === true ? 'First' : 'Second';
}

function main() {
    let inputs = [`2
    7
    10`];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);

            let result = gameOfStones(n);

            console.log(result);
        }

    }
}