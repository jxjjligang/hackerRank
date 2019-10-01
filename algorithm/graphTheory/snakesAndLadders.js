'use strict'

main();
// Complete the quickestWayUp function below.
function quickestWayUp(ladders, snakes) {


}

function main() {
    let inputs = [`2
    3
    32 62
    42 68
    12 98
    7
    95 13
    97 25
    93 37
    79 27
    75 19
    49 47
    67 17
    4
    8 52
    6 80
    26 42
    2 72
    9
    51 19
    39 11
    37 29
    81 3
    59 5
    79 23
    53 7
    43 33
    77 21`,     // expects 3 5 
    ];
    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);

            let ladders = Array(n);
            for (let i = 0; i < n; i++)
                ladders[i] = lines[index++].split(' ').map(laddersTemp => parseInt(laddersTemp, 10));

            const m = parseInt(lines[index++], 10);
            let snakes = Array(m);
            for (let i = 0; i < m; i++)
                snakes[i] = lines[index++].split(' ').map(snakesTemp => parseInt(snakesTemp, 10));

            let result = quickestWayUp(ladders, snakes);
            console.log(result + "\n");
        }
    }
}

