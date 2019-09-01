'use strict'

function minimumBribes(q) {
    function isOrdered(a) {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== (i + 1))
                return false;
        }

        return true;
    }

    function swap(arr, i1, i2) {
        let tmp1 = arr[i1];
        arr[i1] = arr[i2];
        arr[i2] = tmp1;
    }

    let arr = q, ordered = isOrdered(arr), count = 0;
    while (!ordered) {
        for (let i = arr.length - 1; i >= 0; i--) {
            let current = arr[i], dif = current - i;
            if (dif > 3) {
                console.log('Too chaotic');
                return;
            }
            else if (dif > 1) {
                if (dif === 2) {
                    swap(arr, i, i + 1);
                    count++;
                    i = i + 1;
                }
                else {   // dif === 3
                    swap(arr, i, i + 1);
                    swap(arr, i + 1, i + 2);
                    count += 2;
                    i = i + 2;
                }
            }
        }

        ordered = isOrdered(arr);
    }

    console.log(count);
}

main();
function main() {
    let input = `2
    5
    2 1 5 3 4
    5
    2 5 1 3 4`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const t = parseInt(lines[index++], 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(lines[index++], 10), q = lines[index++].split(' ').map(qTemp => parseInt(qTemp, 10));
        minimumBribes(q);
    }
}