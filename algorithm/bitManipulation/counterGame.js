'use strict'

main();

// Complete the counterGame function below.
function counterGame(n) {
    function decrementNumber(num) {
        let twoPowers = [];
        for (let i = 1; i <= 64; i++)
            twoPowers.push(Math.pow(2, i));

        if (num <= 1)
            return 0;

        let steps = 0;
        while (num !== 1) {
            let twoPower = twoPowers.find(element => element === num);
            if (twoPower !== undefined)
                num /= 2;
            else {
                let index = twoPowers.findIndex((element, index) => element < num && twoPowers[index + 1] > num);
                num -= twoPowers[index];
            }
            steps++;
        }

        return steps;
    }

    return (decrementNumber(n) % 2 === 1 ? 'Louise' : 'Richard');
}

function main() {
    let inputs = [`5
    1560834904
    1768820483
    1533726144
    1620434450
    1463674015`,
        `1
    6`];        // expects [Richard, Richard, Louise, Richard, Louise]; Richard
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);
            let result = counterGame(n);
            console.log(result + "\n");
        }
    }
}