'use strict'

main();

function beautifulQuadruples(a, b, c, d) {
    let abcdArr = [a, b, c, d];
    abcdArr.sort((a, b) => a - b);
    a = abcdArr[0], b = abcdArr[1], c = abcdArr[2], d = abcdArr[3];

    const MAX = 1 << 12;
    let cnt = []; // [MAX][MAX]; 
    for (let i = 0; i < MAX; i++) {
        cnt[i] = [];
        for (let j = 0; j < MAX; j++)
            cnt[i].push(0);
    }

    let tot = [];
    for (let j = 0; j < MAX; j++)
        tot.push(0);

    let ans = 0;

    for (let i = 1; i <= a; ++i) {
        for (let j = i; j <= b; ++j) {
            ++cnt[i ^ j][j];
            ++tot[j];
        }
    }

    for (let i = 0; i < MAX; ++i) {
        for (let j = 1; j < MAX; ++j) {
            cnt[i][j] += cnt[i][j - 1];
        }
        if (i) {
            tot[i] += tot[i - 1];
        }
    }

    for (let i = 1; i <= c; ++i) {
        for (let j = i; j <= d; ++j) {
            ans += tot[i] - cnt[i ^ j][i];
        }
    }

    return ans;
}

function main() {
    let inputs = [`1150 1547 853 423`, `1 2 3 4`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const abcd = lines[index++].split(' ');
        const a = parseInt(abcd[0], 10), b = parseInt(abcd[1], 10), c = parseInt(abcd[2], 10), d = parseInt(abcd[3], 10);

        let result = beautifulQuadruples(a, b, c, d);
        console.log(result + "\n");
    }
}