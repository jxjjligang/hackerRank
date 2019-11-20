'use strict'

main();


// Complete the gridSearch function below.
function gridSearch(G, P) {
    const G_ROWS = G.length;
    const P_ROWS = P.length, P_FIRST_ROW = P[0], P_ROW_LENGTH = P_FIRST_ROW.length, ALLP = P.join('');

    if (P_ROWS > G_ROWS)
        return 'NO';

    for (let i = 0; i <= G_ROWS - P_ROWS; i++) {
        let idx = G[i].indexOf(P_FIRST_ROW);
        if (idx === -1)
            continue;
        while (idx !== -1) {
            let subArray_G = G.map((str, index) => {
                if (index < i || index >= i + P_ROWS)
                    return '';
                else
                    return str.substr(idx, P_ROW_LENGTH);
            }), joinedG = subArray_G.join('');

            if (joinedG === ALLP)
                return 'YES';

            idx = G[i].indexOf(P_FIRST_ROW, idx + 1);
        }
    }

    return 'NO';
}

function main() {
    let inputs = [`1
    5 15
    111111111111111
    111111111111111
    111111011111111
    111111111111111
    111111111111111
    3 5
    11111
    11111
    11110`,
        `1
    4 6
    123412
    561212
    123634
    781288
    2 2
    12
    34`,
        `2
10 10
7283455864
6731158619
8988242643
3830589324
2229505813
5633845374
6473530293
7053106601
0834282956
4607924137
3 4
9505
3845
3530
15 15
400453592126560
114213133098692
474386082879648
522356951189169
887109450487496
252802633388782
502771484966748
075975207693780
511799789562806
404007454272504
549043809916080
962410809534811
445893523733475
768705303214174
650629270887160
2 2
99
99`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const RC = lines[index++].split(' '), R = parseInt(RC[0], 10), C = parseInt(RC[1], 10);

            let G = [];
            for (let i = 0; i < R; i++) {
                const GItem = lines[index++];
                G.push(GItem);
            }

            const rc = lines[index++].split(' '), r = parseInt(rc[0], 10), c = parseInt(rc[1], 10);
            let P = [];
            for (let i = 0; i < r; i++) {
                const PItem = lines[index++];
                P.push(PItem);
            }

            let result = gridSearch(G, P);
            console.log(result + "\n");
        }
    }
}