'use strict'

function countSwaps(a) {
    function swap(array, i, j) {
        let tempI = array[i];
        array[i] = array[j];
        array[j] = tempI;
    }

    const n = a.length;
    let swaps = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1; j++) {
            // Swap adjacent elements if they are in decreasing order
            if (a[j] > a[j + 1]) {
                swap(a, j, j + 1);
                swaps++;
            }
        }
    }

    console.log(`Array is sorted in ${swaps} swaps.`);
    console.log(`First Element: ${a[0]}`);
    console.log(`Last Element: ${a[a.length - 1]}`);
}

main();
function main() {
    let input = `3
    3 2 1`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const n = parseInt(lines[index++], 10);

    const a = lines[index++].split(' ').map(aTemp => parseInt(aTemp, 10));
    countSwaps(a);
}