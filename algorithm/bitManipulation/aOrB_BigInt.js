'use strict'

main();

/**
 * Use BigInt to solve problem, it works but can't pass the performance test cases when input a, b, c is extremely long (30000 length)
 * @param {} k 
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 */
function aOrB(k, a, b, c) {
    const BIG_INT_ZERO = 0n, BIG_INT_ONE = 1n;

    let bigA = BigInt('0x' + a), bigB = BigInt('0x' + b), bigC = BigInt('0x' + c);
    let aOrB = bigA | bigB, xor = aOrB ^ bigC, aOrBOrC = aOrB | bigC, bitOne = 1n;

    // shift bigOne to find the hightest bit among (a,b,c)
    let hightestBit = BIG_INT_ZERO;
    aOrBOrC = (aOrBOrC >> BIG_INT_ONE)
    while (aOrBOrC !== BIG_INT_ZERO) {
        aOrBOrC = (aOrBOrC >> BIG_INT_ONE);
        hightestBit++;
    }

    let shifts = hightestBit;
    bitOne = (bitOne << shifts);
    while (xor !== BIG_INT_ZERO && (k > 0)) {
        bitOne = (BIG_INT_ONE << shifts);
        let bitXor = xor & bitOne;
        if (bitXor === bitOne) {   // need to change A or B
            let bitA = bigA & bitOne, bitB = bigB & bitOne, bitC = bigC & bitOne;
            if (bitC === bitOne) {
                k--;
                bigB = bigB | bitOne;
            }
            else {  // bitC === 0
                // There will be 2 cases, one is both A,B is 1 at that bit, or one of them has bit 1
                if (bitA === bitOne) {
                    k--;
                    bigA -= bitOne;
                }
                if (bitB === bitOne) {
                    k--;
                    bigB -= bitOne;
                }
            }
            xor -= bitOne;
        }

        shifts--;
    }

    if (k < 0 || (xor !== BIG_INT_ZERO)) {
        console.log('-1');
    }
    else {
        // console.log('Before try make A/B smaller.');
        // console.log(bigA.toString(16).toUpperCase());
        // console.log(bigB.toString(16).toUpperCase());
        // console.log('');

        shifts = hightestBit;
        while (k > 0 && shifts >= BIG_INT_ZERO) {    // We still have chances to make A samller and still keeps A | B = C
            bitOne = BIG_INT_ONE << shifts;
            let bitA = bigA & bitOne, bitB = bigB & bitOne;
            if (bitA === bitOne && bitB === bitOne) {
                k--;
                bigA -= bitOne;
            }
            else if (bitA === bitOne && bitB === BIG_INT_ZERO && k > 1) {
                k -= 2;
                bigA -= bitOne;
                bigB += bitOne;
            }
            shifts--;
        }

        console.log(bigA.toString(16).toUpperCase());
        console.log(bigB.toString(16).toUpperCase());
    }
}

function main() {
    let inputs = [`3
    54
    8CC5695B3A257A0BB671
    833A22A3496652BBC06F
    D85125CEB4F372EA58D9
    15
3F66A12A7140652C2076
FBD297715038F9E9B032
6728C54E5C4572709E1E
4
E7E66B003B1D1829ED65
3D5998EC58F84B900C3C
FFFFFBEC7BFD5BB9ED7D`,
        `2
    12
CAF7028FD
59B5AC1CE
CAF1B7B7F
3
81B9BB94E
8AB3CA95E
8BBBFB95E`
        , `3
    8
    2B
    9F
    58
    5
    B9
    40
    5A
    2
    91
    BE
    A8`];
    for (let i = 0; i < 1; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const q = parseInt(lines[index++], 10);
        for (let qItr = 0; qItr < q; qItr++) {
            const k = parseInt(lines[index++], 10), a = lines[index++], b = lines[index++], c = lines[index++];

            aOrB(k, a, b, c);
        }
    }
}