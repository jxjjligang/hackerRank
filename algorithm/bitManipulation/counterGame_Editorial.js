'use strict'

main();

// Complete the counterGame function below.
function counterGame(n) {
    function counterGameCleverest(number) {/**Alternate Solution
        In the Discussions, AbhishekVermaIIT made a great point. Instead of counting all the 1's before the rightmost set bit 
        and the number of zeros after, the rightmost set bit and the bits after can be flipped by subtracting 1. 
        For example, 6 (10) = 1010 (2). 5 (10) = 1001 (2). We did have 1 set bit before the rightmost 1, and 1 unset bit after. 
        Now we've got 2 set bits total and can still get the answer just in one pass by counting only set bits. */
        function countOfOne(num) {
            let binaryStr = Number(num - 1).toString(2);
            return Array.from(binaryStr).reduce((agg, current) => agg + (current === '1' ? 1 : 0), 0);
        }

        return (countOfOne(number) % 2 === 1 ? 'Louise' : 'Richard');
    }

    function counterGameBit(num) {
        let twoPowers = [];
        for (let i = 1; i <= 64; i++)
            twoPowers.push(BigInt(Math.pow(2, i)));

        /**
         * Get the most-signifcant-value of number => keeps the highest set bit as 1, let other bits be 0
         * @param {*} number 
         */
        function msb(number) {
            for (let i = twoPowers.length - 1; i >= 0; i--) {
                let power = twoPowers[i];
                if ((BigInt(number) & power) === power)
                    return power;
            }

            throw Error(`Impossible case for number: ${number}`);
        }

        let bigInt = BigInt(num), louiseWin = false;
        if (bigInt <= 1n)
            return louiseWin;

        while (bigInt !== 1n) {
            let isTwoPowers = ((bigInt & (bigInt - 1n)) === 0n);
            bigInt = (isTwoPowers === true ? (bigInt / 2n) : bigInt - msb(bigInt));
            louiseWin = !louiseWin;
        }

        return louiseWin ? 'Louise' : 'Richard';
    }

    return counterGameBit(n);  // counterGameCleverest(n);
}

function main() {
    let inputs = [`7
    1017175374172081
    629784923222424
    959765159837254
    1001263837889179
    587843805747644
    262144
    17592186044416`,
        `5
    1560834904
    1768820483
    1533726144
    1620434450
    1463674015`,
        `1
    6`];        // expects [Richard, Richard, Louise, Richard, Louise]; Richard
    for (let i = 0; i < 3; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const t = parseInt(lines[index++], 10);

        for (let tItr = 0; tItr < t; tItr++) {
            const n = parseInt(lines[index++], 10);
            let result = counterGame(n);
            console.log(result + "\n");
        }
    }
}