'use strict'

// Complete the minTime function below.
function minTime(roads, machines) {
    let totalTime = 0, machineSet = new Set(machines);
    // First, destroy road that connects 2 cities both have machine
    for (let i = roads.length - 1; i >= 0; i--) {
        let road = roads[i], c1 = road[0], c2 = road[1];
        if (machineSet.has(c1) && machineSet.has(c2)) {
            totalTime += road[2];
            roads.splice(i, 1);
        }
    }

    // Then, find all the roads that connects to city has machine
    let mRoads = [];
    for (let i = 0; i < machines.length; i++) {
        let road = roads.find(road => road[0] === machines[i] || road[1] === machines[i]);
        if (road)
            mRoads.push(road[2]);
    }

    // order the time of road in ascending order
    mRoads.sort((a, b) => a - b);
    if (mRoads.length > 1)
        mRoads.length = mRoads.length - 1;

    if (mRoads.length > 0)
        totalTime += mRoads.reduce((agg, cur) => agg + cur);

    return totalTime;
}

main();
function main() {
    let input = `5 3
    2 1 8
    1 0 5
    2 4 5
    1 3 4
    2
    4
    0`;

    input=`100 23
    9 78 35
    9 54 45
    78 69 27
    9 55 9
    9 1 78
    1 92 7
    55 42 57
    1 84 4
    1 5 38
    92 8 75
    55 30 99
    69 7 9
    1 81 45
    8 31 4
    42 23 100
    78 95 3
    54 14 14
    84 53 80
    92 32 8
    42 86 40
    1 64 93
    78 60 65
    64 76 24
    42 89 86
    7 28 48
    69 62 26
    1 40 23
    78 38 29
    8 44 39
    78 3 37
    54 26 17
    62 50 24
    76 66 37
    30 51 75
    86 43 91
    5 77 32
    64 91 11
    14 10 36
    26 20 19
    9 52 50
    77 94 32
    44 67 63
    64 15 61
    92 0 73
    10 37 23
    89 2 37
    92 18 51
    26 47 25
    30 87 15
    47 36 35
    92 72 16
    28 75 93
    78 73 66
    20 19 64
    73 57 1
    91 6 50
    54 33 41
    78 11 38
    37 71 55
    5 63 52
    10 46 22
    94 82 19
    95 83 51
    57 90 10
    63 58 94
    43 45 23
    72 68 62
    82 85 88
    58 4 94
    82 41 62
    3 22 68
    54 70 78
    31 74 27
    36 29 61
    33 24 76
    40 35 61
    83 79 51
    8 59 20
    45 34 26
    38 12 18
    70 99 25
    40 80 81
    31 97 58
    69 21 16
    83 13 22
    80 48 49
    97 65 44
    74 17 1
    68 16 92
    50 98 54
    94 27 76
    81 61 67
    85 49 96
    81 93 31
    22 25 67
    57 96 93
    82 88 92
    86 56 80
    25 39 44
    1
    95
    90
    11
    48
    49
    23
    6
    0
    76
    3
    83
    85
    31
    44
    54
    87
    38
    16
    61
    22
    21
    29`;
    
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const nk = lines[index++].split(' '), n = parseInt(nk[0], 10), k = parseInt(nk[1], 10);
    let roads = Array(n - 1);
    for (let i = 0; i < n - 1; i++)
        roads[i] = lines[index++].split(' ').map(roadsTemp => parseInt(roadsTemp, 10));

    let machines = [];
    for (let i = 0; i < k; i++) {
        const machinesItem = parseInt(lines[index++], 10);
        machines.push(machinesItem);
    }

    const result = minTime(roads, machines);
    console.log(result);
}
