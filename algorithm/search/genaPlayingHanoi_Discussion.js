'use strict'

let bfsIndex = 0;
countTime(main)();

function move(state, rod, disc) {
    return (state & ~(3 << 2 * (disc - 1))) | rod << 2 * (disc - 1);
}

function get_disc(ndisc, state, rod) {
    let disc = ndisc + 1;
    for (let h = ndisc; h != 0; --h) {
        let r = 3 & state >> 2 * (h - 1);
        if (r === rod)
            disc = h;
    }
    return disc;
}

// return unsigned long 
function solve(ndisc, start) {
    let win = 0;
    if (start === win)
        return 0;

    let bfs = [];
    bfs.push(start);
    let depth = [];
    for (let i = 0; i < (1 << 2 * ndisc); i++)
        depth.push(0);

    depth[start] = 0;
    while (true) {
        let par = bfs[bfsIndex++];
        // bfs.shift();

        let d = [];
        for (let rod = 0; rod < 4; ++rod) {
            d[rod] = get_disc(ndisc, par, rod);
        }
        for (let from = 0; from < 4; ++from) {
            if (d[from] === ndisc + 1)
                continue;

            for (let to = 0; to < 4; ++to) {
                if (d[to] > d[from]) {
                    let ch = move(par, to, d[from]);
                    if (ch === win)
                        return 1 + depth[par];

                    if (!depth[ch] && ch != start) {
                        depth[ch] = 1 + depth[par];
                        bfs.push(ch);
                    }
                }
            }
        }
    }
    return -1;
}


function main() {
    let inputs = [`10
    4 1 2 1 4 3 3 4 3 4`,
        `3
    1 4 1`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const N = parseInt(lines[index++], 10), a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10));

        let start = 0;
        for (let h = 1; h <= N; ++h)
            start = move(start, a[h - 1] - 1, h);

        console.log(solve(N, start));
    }
}


function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}