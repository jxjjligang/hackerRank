'use strict'

main();

function aOrB(k, a, b, c) {
    const LENGTH_FOUR = 4, STRING_ONE = '1', STRING_ZERO = '0';
    const HEX_TO_BINARY = new Map([['0', '0000'], ['1', '0001'], ['2', '0010'], ['3', '0011'],
    ['4', '0100'], ['5', '0101'], ['6', '0110'], ['7', '0111'],
    ['8', '1000'], ['9', '1001'], ['A', '1010'], ['B', '1011'],
    ['C', '1100'], ['D', '1101'], ['E', '1110'], ['F', '1111'],
    ]);

    function compareAndChange(binaryA, binaryB, k) {
        for (let i = 0; i < a.length; i++) {
            let byteA = HEX_TO_BINARY.get(a[i]), byteB = HEX_TO_BINARY.get(b[i]), byteC = HEX_TO_BINARY.get(c[i]);
            for (let j = 0; j < LENGTH_FOUR; j++) {
                if (k < 0)
                    return k;

                let bitA = byteA[j], bitB = byteB[j], bitC = byteC[j];
                let abOr = ((bitA === STRING_ONE || bitB === STRING_ONE) ? STRING_ONE : STRING_ZERO);
                if (abOr === bitC) {
                    binaryA.push(bitA);
                    binaryB.push(bitB);
                    continue;
                }

                // Now, abOr !== bitC
                if (bitC === STRING_ONE) {
                    // bitA and bitB are all 0, and change bitB to 1
                    k--;
                    binaryA.push(bitA);
                    binaryB.push(STRING_ONE);
                }
                else {  // bitC === '0', at least one of [bitA, bitB] is 1
                    let bits = [bitA, bitB], binaryAr = [binaryA, binaryB];
                    for (let i = 0; i < 2; i++) {
                        let bitValue = bits[i], binaryAOrB = binaryAr[i];
                        if (bitValue === STRING_ONE) {
                            k--;
                            binaryAOrB.push(STRING_ZERO);
                        }
                        else
                            binaryAOrB.push(bitValue);
                    }
                }
            }   // end of for (let j = 0; j < LENGTH_FOUR; j++) {
        }

        return k;
    }

    let binaryA = [], binaryB = [];
    k = compareAndChange(binaryA, binaryB, k);
    if (k < 0)
        console.log('-1');
    else {
        // We still have chances to make A samller and still keeps A | B = C
        for (let i = 0; i < binaryA.length; i++) {
            if (k <= 0)
                break;

            let bitA = binaryA[i], bitB = binaryB[i];
            if (bitA === STRING_ONE && bitB === STRING_ONE) {
                k--;
                binaryA[i] = STRING_ZERO;
            }
            else if (bitA === STRING_ONE && bitB === STRING_ZERO && k > 1) {
                k -= 2;
                binaryA[i] = STRING_ZERO;
                binaryB[i] = STRING_ONE;
            }
        }

        console.log(BigInt('0b' + binaryA.join('')).toString(16).toUpperCase());
        console.log(BigInt('0b' + binaryB.join('')).toString(16).toUpperCase());
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