'use strict'

main();
// Complete the quickestWayUp function below.
function quickestWayUp(ladders, snakes) {
    const START_POSITION = 1, END_POSITION = 100, MAX_STEPS = 6;
    let ladderMap = new Map(), snakeMap = new Map();
    for (let i = 0; i < ladders.length; i++)
        ladderMap.set(ladders[i][0], ladders[i][1]);
    for (let i = 0; i < snakes.length; i++)
        snakeMap.set(snakes[i][0], snakes[i][1]);

    function findNextChoices(prev, ladderMap, snakeMap) {
        let choices = [], prevPosition = prev.position;
        if (prevPosition >= END_POSITION || prevPosition < START_POSITION)
            throw Error(`Shouldn't happen when plan the game step by step, prevPosition: ${prevPosition}`);

        let normalCaseProcessed = false, snakeCases = 0;
        for (let nextPosition = Math.min(END_POSITION, prevPosition + MAX_STEPS); nextPosition > prevPosition; nextPosition--) {
            if (ladderMap.has(nextPosition)) {
                choices.push({ position: ladderMap.get(nextPosition), steps: prev.steps + 1 });
            }
            else if (snakeMap.has(nextPosition)) {
                choices.push({ position: snakeMap.get(nextPosition), steps: prev.steps + 1 });
                snakeCases++;
            }
            else if (normalCaseProcessed === false) {
                // only add [normal next position] once, which means no snake and no ladder
                choices.push({ position: nextPosition, steps: prev.steps + 1 });
                normalCaseProcessed = true;
            }

        }

        if (snakeCases >= MAX_STEPS)
            return;  // therefore -1 will be returned;
        else
            return choices;
    }

    // use BFS way to push all choices when try to find the next position
    let queue = [{ position: START_POSITION, steps: 0 }];
    while (queue.length > 0) {
        let prev = queue.shift();
        let choices = findNextChoices(prev, ladderMap, snakeMap);
        if (choices === undefined || choices.length === 0)
            return -1;
        else {
            for (let i = 0; i < choices.length; i++) {
                let nextChoice = choices[i];
                if (nextChoice.position === END_POSITION)
                    return prev.steps + 1;
                queue.push(nextChoice);
            }
        }
    }

    return -1;
}

function main() {
    let inputs = [`1
    1
    3 90
    7
    99 10
    97 20
    98 30
    96 40
    95 50
    94 60
    93 70`,     // expects -1
        `2
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
        `3
    2
    3 54
    37 100
    1
    56 33
    2
    3 57
    8 100
    1
    88 44
    1
    7 98
    1
    99 1`,      // expects 3 2 2 
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

