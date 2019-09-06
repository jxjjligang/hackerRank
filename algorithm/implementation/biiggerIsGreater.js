'use strict'

// Complete the biggerIsGreater function below.
function biggerIsGreater(w) {
    let swapped = false;
    for (let i = w.length - 2; i >= 0; i--) {
        let outer = w[i];
        for (let j = w.length - 1; j > i; j--) {
            let inner = w[j];
            if (inner > outer) {
                let temp = outer, chars = w.split('');
                chars[i] = inner;
                chars[j] = temp;
                return chars.slice(0, i + 1).join('') + chars.slice(i + 1).sort().join('');
            }
        }
    }

    if (!swapped)
        return 'no answer';
}

let input = `5
ab
bb
hefg
dhck
dkhc`;

input=`6
lmno
dcba
dcbb
abdc
abcd
fedcbabcd`;

let lines = input.split('\n');
const T = parseInt(lines[0], 10);

for (let i = 1; i < lines.length; i++) {
    const w = lines[i];
    let result = biggerIsGreater(w);
    console.log(result + "\n");
}
