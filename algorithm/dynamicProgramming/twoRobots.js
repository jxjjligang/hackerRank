'use strict'
main();

function twoRobots(m, queries) {
    const MOVES = queries.length;
    let r1Used = false, r2Used = false, r1Dist = -1, r2Dist = -1;

    function getMinTravel(r1Used, r2Used, r1Place, r2Place, moveIndex) {
        if (moveIndex > MOVES)
            return r1Dist + r2Dist;

        let start = queries[moveIndex][0], end = queries[moveIndex][1];
        if (r1Used === false && r2Used === false) {
            let min1 = getMinTravel(true, false, r1Dist + Math.abs(start - end), 1 + moveIndex);
            let min2 = getMinTravel(false, true, r1Dist, r21Dist + Math.abs(start - end), 1 + moveIndex);
        }
        else if (r1Used === false) {

        }
        else if (r2Used === false) {

        }
        else {

        }
    }
}

function main() {
    let inputs = [`3
5 4
1 5
3 2
4 1
2 4
4 2
1 2
4 3
10 3
2 4
5 4
9 8`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const t = parseInt(lines[index++], 10), mn = lines[index++].split(' ');
        const m = parseInt(mn[0], 10), n = parseInt(mn[1], 10);

        let queries = Array(n);
        for (let queriesRowItr = 0; queriesRowItr < n; queriesRowItr++) {
            queries[queriesRowItr] = lines[index++].split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
        }
        console.log(twoRobots(m, queries) + "\n");
    }
}