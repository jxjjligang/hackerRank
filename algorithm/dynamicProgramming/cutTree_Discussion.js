'use strict'

main();


// Use the same code and logic of C# solution from db_blagoev in [Leaderboard]
function cutTree(N, K, roads) {
    function createZeroArray(count) {
        let arr = [];
        for (let i = 0; i < count; i++)
            arr.push(0);

        return arr;
    }

    let edges = [];
    for (let i = 0; i < N; i++)
        edges.push([]);

    for (let e of roads) {
        let A = e[0] - 1, B = e[1] - 1;
        edges[A].push(B);
        edges[B].push(A);
    }

    let visited = [];   // bool array
    for (let i = 0; i < N; i++)
        visited.push(false);

    let parent = createZeroArray(N), nchild = createZeroArray(N), childrenArr = [];
    for (let i = 0; i < N; i++)
        childrenArr.push([]);

    let queue = [], root = 0;
    parent[root] = -1;
    queue.push(root);
    while (queue.length > 0) {
        let a = queue.shift();
        if (visited[a] === true)
            continue;

        visited[a] = true;
        for (let b of edges[a]) {
            if (visited[b] === true)
                continue;

            parent[b] = a;
            nchild[a]++;
            childrenArr[a].push(b);
            queue.push(b);
        }
    }

    let vchild = createZeroArray(N), subnodes = [], zeros = [];
    for (let i = 0; i < N; i++)
        zeros.push(0n);

    for (let i = 0; i < N; i++)
        subnodes.push(zeros.slice());

    for (let i = 0; i < N; i++) {
        if (nchild[i] > 0)
            continue;

        subnodes[i][0] = 1n;
        for (let j = i; j >= 0; j = parent[j]) {
            var p = parent[j];
            if (p >= 0)
                vchild[p]++;

            if (nchild[j] > 0) {
                subnodes[j][0] = 1n;

                for (let c of childrenArr[j]) {
                    for (let k = K; k >= 1; k--) {
                        let combs = 0n;
                        for (let l = 0; l < k; l++) {
                            combs += subnodes[j][l] * subnodes[c][k - l];
                        }
                        combs += subnodes[j][k - 1];
                        combs += subnodes[j][k];

                        subnodes[j][k] = combs;
                    }
                }
            }

            if (p < 0 || vchild[p] < nchild[p]) {
                break;
            }
        }
    }

    let total = 1n;
    for (let j = 0; j < N; j++) {
        let p = parent[j];
        for (let i = 0; i <= K; i++) {
            if (p < 0)
                total += subnodes[j][i];
            else if (i > 0)
                total += subnodes[j][i - 1];
        }
    }

    return total.toString();
}

function main() {
    let inputs = [`10 3
    10 8
    7 10
    2 10
    5 4
    6 1
    2 6
    4 2
    9 2
    7 3`
        , `3 1
    2 1
    2 3`];
    for (let i = 0; i < 1; i++) {    //  inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
        let edges = Array(n - 1);
        for (let edgesRowItr = 0; edgesRowItr < n - 1; edgesRowItr++) {
            edges[edgesRowItr] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        console.log(cutTree(n, k, edges) + "\n");
    }
}