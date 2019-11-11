'use strict'

main();



/*
 * Complete the towerBreakers function below.
 */
function towerBreakers(n) {
    let d = new Map();
    d.set(0, 1);
    F(130);

    function F(n) {
        if (d.has(n))
            return d.get(n);
        else {
            let temp = 0;
            for (let k = 1; k < Math.floor(Math.sqrt(n)) + 1; k++)
                temp += F(n - k ** 2);
            d.set(n, temp);
        }
        return d.get(n);
    }

    let ans = 0;
    while (d.get(ans) < n)
        ans += 1;
    return (ans);
}

function main() {
    let inputs = [`1
    170`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);

            let result = towerBreakers(n);
            console.log(result + "\n");
        }
    }
}