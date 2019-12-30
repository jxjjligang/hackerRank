'use strict'

main();

/*
 * Based on the idea of [Oh_Dear_God] from Discussion board.
 */
function storyOfATree(n, edges, k, guesses) {
    const ROOT_ONE = 1;
    function removeDivisors(totalPassed, n) {
        for (let i = Math.min(Math.ceil(n / 2), totalPassed); i > 1; i--) {
            if (totalPassed % i === 0 && n % i === 0) {
                totalPassed /= i;
                n /= i;
            }
        }

        return `${totalPassed}/${n}`;
    }

    /**
     * Create 2 map to refect tree hierarchy: map 1 is parent -> children, map 2 is child -> parent
     *  */
    function createMaps(root, edges) {
        let parent2Children = new Map(), child2Parent = new Map();
        let queue = [root], visited = new Set();
        while (queue.length > 0) {
            let node = queue.shift();
            visited.add(node);

            let adjacentEdges = edges.filter(eg => eg[0] === node || eg[1] === node), children = new Set();
            for (let edge of adjacentEdges) {
                let anotherNode = (edge[0] === node ? edge[1] : edge[0]);
                if (!visited.has(anotherNode)) {
                    queue.push(anotherNode);
                    child2Parent.set(anotherNode, node);
                    children.add(anotherNode);
                }
            }

            parent2Children.set(node, children);
        }

        return [parent2Children, child2Parent];
    }

    function fillCountArr(countArr, edges, guesses, parent2Children) {
        function getAllChildren(endNode) {
            let allChildren = new Set(), queue = [endNode];

            while (queue.length > 0) {
                let parent = queue.shift();
                allChildren.add(parent);

                let children = parent2Children.get(parent);
                for (let child of children)
                    queue.push(child);
            }

            return allChildren;
        }

        let queue = [ROOT_ONE], totalEdges = 0;
        while (queue.length > 0) {
            let startNode = queue.shift();

            totalEdges += parent2Children.get(startNode).size;
            for (let endNode of parent2Children.get(startNode)) {
                let oneGuessPassed;
                if (guesses.find(edge => edge[0] === startNode && edge[1] === endNode) !== undefined)
                    oneGuessPassed = true;
                else if (guesses.find(edge => edge[1] === startNode && edge[0] === endNode) !== undefined)
                    oneGuessPassed = false;

                if (oneGuessPassed !== undefined) {
                    let allChildren = getAllChildren(endNode);
                    if (oneGuessPassed === true) {
                        countArr[ROOT_ONE]++;
                        for (let i = 2; i <= n; i++) {
                            if (!allChildren.has(i))
                                countArr[i]++;
                        }
                    }
                    else {
                        for (let i = 2; i <= n; i++) {
                            if (allChildren.has(i))
                                countArr[i]++;
                        }
                    }
                }
                queue.push(endNode);
            }
        }           // end of while (queue.length > 0) {
        console.log(`totalEdges: ${totalEdges}`);
    }               // end of function fillCountArr(countArr, edges, guesses) {

    let guessMap = new Map();
    for (let guess of guesses)
        guessMap.set(guess[1], guess[0]);

    let twoMaps = createMaps(ROOT_ONE, edges), parent2Children = twoMaps[0], child2Parent = twoMaps[1];
    let countArr = [];    // save value of [passed count] when [root node number] is array index
    for (let i = 0; i <= n; i++)
        countArr[i] = 0;

    fillCountArr(countArr, edges, guesses, parent2Children);
    let totalPassed = countArr.filter(v => v >= k).length;

    if (totalPassed === n)
        return '1/1';
    else if (totalPassed === 0)
        return '0/1';
    else
        return removeDivisors(totalPassed, n);
}

function main() {
    let inputs = [`1
    100
    93 19
    33 90
    26 89
    3 96
    34 68
    21 47
    11 69
    77 63
    1 50
    69 30
    54 32
    35 37
    5 35
    73 37
    76 66
    97 70
    4 80
    74 23
    49 4
    53 3
    80 86
    14 38
    67 31
    33 86
    36 5
    93 67
    83 56
    88 19
    83 31
    92 31
    77 33
    59 76
    61 36
    16 39
    17 49
    86 50
    55 71
    81 16
    9 20
    9 2
    34 10
    8 28
    2 57
    50 73
    100 96
    67 47
    19 90
    66 63
    76 70
    16 71
    98 63
    62 55
    42 36
    39 24
    60 73
    3 87
    44 37
    85 66
    98 39
    34 9
    54 85
    73 10
    65 16
    96 92
    59 46
    91 21
    99 26
    91 40
    82 11
    44 28
    37 72
    46 22
    66 23
    57 52
    99 16
    5 25
    7 63
    64 34
    12 38
    27 68
    36 30
    33 78
    76 75
    61 18
    43 64
    38 46
    78 13
    41 87
    38 48
    84 91
    58 100
    44 6
    95 83
    29 51
    94 82
    29 81
    35 79
    44 15
    45 5
    99 50
    38 14
    28 8
    16 39
    61 36
    16 81
    61 18
    45 5
    19 88
    87 41
    34 68
    3 87
    93 67
    46 38
    52 57
    92 96
    83 31
    3 53
    76 75
    100 58
    2 57
    91 40
    99 26
    75 76
    8 28
    10 73
    60 73
    71 55
    55 62
    5 35
    96 92
    93 19
    50 1
    41 87
    77 63
    65 16
    12 38
    76 66
    63 77
    31 67
    3 96
    14 38
    50 73
    58 100
    98 63
    33 78
    26 89
    70 97
    68 27
    38 46
    86 50
    2 9
    36 61
    89 26
    72 37
    64 34
    48 38
    47 21
    25 5
    13 78
    73 60
    63 7
    11 69
    85 66
    70 76
    1 50
    38 48
    90 33
    35 37
    56 83
    73 37
    37 73
    67 31
    91 84
    77 33
    44 37
    73 10
    7 63
    21 47
    33 86
    57 52
    18 61
    81 16
    54 32
    50 86
    46 22
    9 34
    6 44
    66 23
    96 3
    44 28
    35 79
    24 39
    30 36
    37 35
    66 63
    27 68
    39 98
    96 100
    99 16`,
        `2
4
1 2
1 3
3 4
2 2
1 2
3 4
3
1 2
1 3
2 2
1 2
1 3`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const n = parseInt(lines[index++], 10);
            let edges = Array(n - 1);
            for (let edgesRowItr = 0; edgesRowItr < n - 1; edgesRowItr++)
                edges[edgesRowItr] = lines[index++].split(' ').map(edgesTemp => parseInt(edgesTemp, 10));


            const gk = lines[index++].split(' '), g = parseInt(gk[0], 10), k = parseInt(gk[1], 10);
            let guesses = Array(g);
            for (let guessesRowItr = 0; guessesRowItr < g; guessesRowItr++)
                guesses[guessesRowItr] = lines[index++].split(' ').map(guessesTemp => parseInt(guessesTemp, 10));

            let result = storyOfATree(n, edges, k, guesses);
            console.log(result);
        }
    }
}
