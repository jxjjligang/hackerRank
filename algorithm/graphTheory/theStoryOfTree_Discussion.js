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
        let parent2Children = new Map();
        let queue = [root], visited = new Set();
        while (queue.length > 0) {
            let node = queue.shift();
            visited.add(node);

            let adjacentEdges = edges.filter(eg => eg[0] === node || eg[1] === node), children = new Set();
            for (let edge of adjacentEdges) {
                let anotherNode = (edge[0] === node ? edge[1] : edge[0]);
                if (!visited.has(anotherNode)) {
                    queue.push(anotherNode);
                    children.add(anotherNode);
                }
            }

            parent2Children.set(node, children);
        }

        return [parent2Children];
    }

    function fillCountArr(countArr, guesses, parent2Children) {
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

        let queue = [ROOT_ONE];
        while (queue.length > 0) {
            let startNode = queue.shift();
            for (let endNode of parent2Children.get(startNode)) {
                let hasStart2End, hasEnd2Start;
                if (guesses.find(edge => edge[0] === startNode && edge[1] === endNode) !== undefined)
                    hasStart2End = true;

                if (guesses.find(edge => edge[1] === startNode && edge[0] === endNode) !== undefined)
                    hasEnd2Start = true;

                if (hasStart2End !== undefined || hasEnd2Start !== undefined) {
                    let allChildren = getAllChildren(endNode);
                    if (hasStart2End === true)
                        countArr[ROOT_ONE]++;

                    for (let i = 2; i <= n; i++) {
                        let isChildren = allChildren.has(i);
                        if (isChildren === false && hasStart2End === true)
                            countArr[i]++;
                        if (isChildren === true && hasEnd2Start === true)
                            countArr[i]++;

                    }
                }
                queue.push(endNode);
            }
        }           // end of while (queue.length > 0) {
    }               // end of function fillCountArr(countArr, edges, guesses) {

    let twoMaps = createMaps(ROOT_ONE, edges), parent2Children = twoMaps[0];
    let countArr = [];    // save value of [passed count] when [root node number] is array index
    for (let i = 0; i <= n; i++)
        countArr[i] = 0;

    fillCountArr(countArr, guesses, parent2Children);
    let totalPassed = countArr.filter(v => v >= k).length;

    if (totalPassed === n)
        return '1/1';
    else if (totalPassed === 0)
        return '0/1';
    else
        return removeDivisors(totalPassed, n);
}

function main() {
    let inputs = [`5
    100
    39 54
    43 47
    48 81
    46 5
    76 41
    69 73
    26 85
    28 44
    63 52
    91 27
    50 25
    30 15
    4 64
    61 42
    84 79
    25 17
    9 18
    89 24
    3 91
    66 36
    81 91
    68 88
    90 67
    54 92
    95 40
    38 45
    63 91
    18 40
    44 25
    20 19
    99 93
    40 90
    91 93
    64 15
    79 13
    19 95
    99 4
    95 50
    55 89
    81 11
    69 10
    61 90
    6 53
    36 96
    77 6
    56 50
    55 10
    39 87
    32 56
    5 65
    68 78
    87 12
    84 28
    50 41
    74 53
    36 85
    7 58
    70 77
    51 47
    35 90
    10 98
    60 30
    37 13
    67 99
    95 78
    43 16
    34 60
    58 85
    83 59
    43 49
    75 53
    98 41
    97 80
    31 54
    3 62
    62 36
    65 85
    61 92
    83 64
    57 8
    14 24
    98 100
    34 51
    7 82
    17 94
    58 80
    74 98
    33 70
    85 1
    6 71
    22 54
    36 8
    21 73
    71 72
    31 29
    38 62
    23 45
    47 86
    2 89
    99 50
    98 100
    39 87
    35 90
    6 53
    51 47
    20 19
    91 27
    63 91
    15 64
    70 33
    92 54
    16 43
    87 12
    47 86
    58 85
    62 38
    5 46
    24 89
    98 41
    91 3
    91 93
    2 89
    1 85
    44 25
    54 92
    71 6
    85 1
    55 10
    7 58
    25 50
    48 81
    90 67
    60 34
    32 56
    41 98
    77 70
    95 78
    97 80
    31 29
    99 67
    86 47
    18 9
    36 8
    51 34
    61 42
    5 65
    14 24
    59 83
    36 62
    58 80
    34 51
    84 79
    52 63
    53 6
    87 39
    3 62
    15 30
    85 65
    89 24
    36 96
    46 5
    33 70
    98 10
    78 95
    41 76
    6 77
    65 5
    17 25
    73 21
    95 50
    4 64
    85 36
    43 49
    38 45
    54 31
    56 50
    13 79
    98 74
    64 83
    26 85
    63 52
    60 30
    8 57
    28 44
    42 61
    95 40
    9 18
    43 47
    85 58
    75 53
    68 78
    65 85
    3 91
    10 69
    22 54
    76 41
    37 13
    78 68
    80 97
    100
    100 91
    88 84
    32 13
    30 39
    20 50
    21 8
    27 97
    77 4
    77 35
    30 20
    13 34
    29 55
    6 61
    95 2
    82 43
    48 18
    96 95
    33 2
    32 99
    18 61
    54 75
    66 32
    19 75
    50 79
    88 67
    49 44
    13 61
    30 55
    82 54
    29 76
    14 65
    6 91
    35 27
    21 31
    11 45
    37 16
    98 37
    32 21
    93 45
    13 42
    73 19
    54 27
    91 35
    6 24
    45 12
    20 99
    19 23
    82 81
    47 27
    39 69
    26 70
    64 7
    81 70
    10 70
    57 31
    65 39
    28 72
    58 82
    82 3
    36 95
    77 1
    44 27
    9 95
    3 63
    21 45
    10 41
    62 33
    40 49
    27 5
    23 53
    60 56
    68 100
    59 31
    85 52
    68 36
    57 15
    28 31
    88 77
    54 64
    65 87
    37 31
    94 93
    52 91
    84 51
    43 56
    70 22
    40 90
    23 92
    86 51
    89 48
    25 72
    93 80
    49 71
    38 95
    83 85
    17 97
    3 78
    76 46
    60 74
    99 50
    75 19
    39 30
    49 44
    91 52
    65 14
    57 31
    36 68
    22 70
    30 55
    99 20
    27 5
    35 27
    11 45
    83 85
    10 41
    98 37
    44 27
    45 93
    27 54
    35 91
    34 13
    2 33
    54 75
    67 88
    97 17
    31 21
    77 4
    76 29
    50 20
    30 39
    3 78
    82 43
    52 85
    64 7
    18 48
    33 2
    13 42
    40 90
    95 38
    3 63
    35 77
    45 11
    93 94
    45 21
    10 70
    78 3
    43 56
    36 95
    29 55
    57 15
    74 60
    21 8
    12 45
    27 97
    44 49
    33 62
    32 21
    31 59
    59 31
    75 54
    82 58
    97 27
    50 79
    27 47
    95 9
    5 27
    84 88
    13 34
    4 77
    82 81
    46 76
    82 3
    70 22
    88 77
    81 70
    68 36
    90 40
    55 30
    18 61
    93 80
    26 70
    19 73
    48 18
    88 84
    72 25
    32 99
    64 54
    85 83
    53 23
    91 35
    21 31
    27 35
    72 28
    77 1
    69 39
    23 53
    6 91
    91 6
    95 2
    100
    89 81
    49 61
    14 74
    63 88
    84 44
    78 92
    26 50
    56 47
    36 22
    20 79
    47 93
    73 99
    24 34
    91 92
    61 91
    1 49
    67 26
    13 54
    99 45
    3 29
    53 15
    42 12
    64 17
    94 84
    87 93
    12 37
    25 94
    49 80
    39 31
    31 68
    97 100
    94 78
    72 8
    69 81
    43 73
    58 30
    97 38
    2 37
    81 68
    2 46
    50 30
    23 69
    67 93
    64 90
    4 28
    63 66
    15 100
    57 79
    92 29
    2 66
    37 58
    97 72
    23 29
    44 4
    14 66
    34 82
    57 24
    97 89
    37 97
    6 96
    86 15
    13 85
    18 85
    83 64
    39 59
    24 31
    9 38
    23 55
    54 66
    9 21
    27 53
    71 85
    43 82
    33 23
    32 36
    7 50
    33 83
    71 95
    25 75
    5 62
    90 60
    32 69
    19 97
    98 34
    65 40
    3 52
    65 31
    57 96
    91 76
    56 10
    5 2
    65 11
    91 77
    4 70
    59 41
    48 35
    51 57
    35 32
    29 16
    99 50
    85 18
    3 52
    29 92
    66 2
    50 30
    30 50
    81 68
    67 93
    13 54
    86 15
    44 84
    22 36
    57 24
    15 86
    76 91
    72 97
    54 13
    92 78
    38 9
    79 57
    34 98
    11 65
    93 87
    20 79
    95 71
    64 17
    37 12
    14 74
    13 85
    56 10
    28 4
    73 99
    47 56
    46 2
    78 94
    89 81
    100 97
    2 5
    1 49
    42 12
    25 94
    12 42
    85 71
    60 90
    99 73
    71 95
    59 39
    82 34
    33 23
    83 33
    34 24
    26 50
    92 91
    7 50
    23 55
    27 53
    53 15
    15 100
    38 97
    29 16
    63 66
    31 39
    80 49
    61 49
    9 21
    32 35
    31 65
    49 1
    58 37
    90 64
    5 62
    75 25
    57 79
    63 88
    57 51
    35 32
    92 29
    8 72
    87 93
    94 78
    68 31
    41 59
    77 91
    50 7
    39 59
    53 27
    24 34
    2 66
    85 13
    62 5
    37 2
    66 14
    32 69
    84 44
    31 68
    88 63
    68 81
    65 11
    66 63
    100
    81 15
    74 63
    70 14
    1 7
    14 46
    17 71
    16 83
    100 98
    18 93
    53 1
    30 63
    69 74
    95 50
    90 48
    96 70
    87 64
    64 91
    71 1
    62 42
    50 77
    26 50
    50 34
    55 3
    15 74
    60 98
    39 27
    67 7
    16 95
    96 45
    77 81
    51 90
    28 59
    5 73
    71 50
    31 42
    46 65
    52 62
    66 2
    34 36
    18 47
    8 24
    65 22
    71 100
    29 78
    61 50
    55 92
    65 3
    28 95
    74 52
    94 8
    67 96
    85 78
    12 15
    19 81
    32 97
    5 20
    38 3
    66 46
    5 52
    25 92
    86 2
    72 80
    69 56
    68 79
    38 94
    64 61
    96 84
    73 21
    64 80
    50 9
    30 37
    84 35
    57 41
    80 29
    25 58
    4 42
    81 93
    11 71
    37 76
    75 78
    48 66
    43 80
    39 97
    13 8
    89 23
    68 36
    41 67
    34 88
    27 58
    23 97
    25 49
    33 23
    18 10
    82 66
    40 20
    6 76
    54 4
    44 54
    99 4
    99 50
    2 86
    65 22
    43 80
    85 78
    98 100
    99 4
    64 87
    30 37
    63 30
    67 41
    78 85
    52 62
    17 71
    19 81
    29 80
    37 30
    96 84
    73 21
    18 47
    38 3
    92 25
    3 65
    13 8
    97 39
    35 84
    46 65
    71 1
    69 74
    58 25
    50 95
    66 48
    75 78
    81 15
    3 55
    81 93
    64 91
    67 96
    42 62
    15 12
    42 31
    50 9
    80 43
    48 90
    66 82
    62 42
    25 92
    36 68
    20 40
    18 93
    65 3
    18 10
    74 69
    69 56
    90 48
    2 66
    23 97
    73 5
    39 97
    64 80
    68 36
    66 46
    31 42
    37 76
    84 96
    58 27
    28 59
    98 60
    21 73
    41 57
    26 50
    15 81
    92 55
    74 52
    94 38
    82 66
    86 2
    74 63
    50 77
    1 7
    30 63
    80 64
    83 16
    45 96
    28 95
    23 89
    10 18
    77 50
    50 61
    39 27
    61 64
    70 14
    71 17
    64 61
    100 71
    74 15
    14 46
    34 88
    90 51
    93 81
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
