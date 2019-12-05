'use strict'
const MOD = 1000000007, CAPS_COUNT = 100, PERSON_COUNT = 10;

// capList[i]'th vector contains the list of persons having a cap with id i 
// id is between 1 to 100 so we declared an array of 101 vectors as indexing 
// starts from 0. 
let capList = [];

// dp[2^10][101] .. in dp[i][j], i denotes the mask i.e., it tells that 
// how many and which persons are wearing cap. j denotes the first j caps 
// used. So, dp[i][j] tells the number ways we assign j caps to mask i 
// such that none of them wears the same cap 
let dp = [];
initialize();

let allmask;    // This is used for base case, it has all the N bits set. So, it tells whether all N persons are wearing a cap. 
main();

function initialize() {
    for (let i = 0; i <= CAPS_COUNT; i++)
        capList[i] = [];

    for (let i = 0; i <= (1 << PERSON_COUNT); i++)
        dp[i] = [];
}

// Mask is the set of persons, i is cap-id (OR the  
// number of caps processed starting from first cap). 
function countWaysUtil(mask, i) {
    // If all persons are wearing a cap so we are done and this is one way so return 1 
    if (mask === allmask)
        return 1;

    // If not everyone is wearing a cap and also there are no more caps left to process, so there is no way, thus return 0; 
    if (i > CAPS_COUNT)
        return 0;

    // If we already have solved this subproblem, return the answer. 
    if (dp[mask][i] !== undefined)
        return dp[mask][i];

    // Ways, when we don't include this cap in our arrangement or solution set. 
    let ways = countWaysUtil(mask, i + 1);

    // size is the total number of persons having cap with id i. 
    let personCount = capList[i].length;

    // So, assign one by one ith cap to all the possible persons and recur for remaining caps. 
    for (let j = 0; j < personCount; j++) {
        let bitMask = (1 << capList[i][j]), alreadyWearCap = ((mask & bitMask) !== 0);

        // if person capList[i][j] is already wearing a cap so continue as we cannot assign him this cap 
        if (alreadyWearCap)
            continue;
        else {
            // Else assign him this cap and recur for remaining caps with new updated mask vector 
            let newMask = mask | bitMask;
            let waysAfterCapChosen = countWaysUtil(newMask, i + 1);
            ways += waysAfterCapChosen;
        }
        ways %= MOD;
    }

    // Save the result and return it. 
    dp[mask][i] = ways;
    return ways;
}

function main() {
    let inputs = [`3               
    5 100 1         
    2               
    5 100`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        let n = parseInt(lines[index++]);   // number of persons in every test case 
        lines.shift();
        countWays(n, lines);
    }
}

function countWays(n, lines) {
    //----------- READ INPUT -------------------------- 
    let x, index = 0;

    for (let i = 0; i < n; i++) {
        let str = lines[index++], split = str.split(" ");

        // while there are words in the split[] 
        for (let j = 0; j < split.length; j++) {
            // add the ith person in the list of cap if with id x 
            x = parseInt(split[j]);
            capList[x].push(i);
        }
    }
    //---------------------------------------------------- 

    // All mask is used to check of all persons 
    // are included or not, set all n bits as 1 
    allmask = (1 << n) - 1;

    // Initialize all entries in dp as -1 
    // for (let is of dp) {
    //     for (let i = 0; i < is.length; i++)
    //         is[i] = -1;
    // }

    // Call recursive function count ways 
    console.log(countWaysUtil(0, 1));
} 