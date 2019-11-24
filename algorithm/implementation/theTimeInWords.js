'use strict'

main();

// Complete the timeInWords function below.
function timeInWords(h, m) {
    const numberToWord = new Map([[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five'], [6, 'six'], [7, 'seven'], [8, 'eight'], [9, 'nine'], [10, 'ten'],
    [11, 'eleven'], [12, 'twelve'], [13, 'thirteen'], [14, 'fourteen'], [15, 'quarter'], [16, 'sixteen'], [17, 'seventeen'], [18, 'eighteen'], [19, 'nineteen'], [20, 'twenty']]);
    const O_CLOCK = "o' clock";

    let word;
    if (m === 0)
        word = `${numberToWord.get(h)} ${O_CLOCK}`;
    else if (m === 30)
        word = `half past ${numberToWord.get(h)}`;
    else {
        let isPast = (m < 30 ? true : false), minute = (isPast ? m : (60 - m)), hour = (isPast ? h : (h + 1) % 12);
        let minuteWord = ((minute <= 20) ? numberToWord.get(minute) : `twenty ${numberToWord.get(minute - 20)}`);
        if (minute != 15) {
            minuteWord += ` minute`;
            if (minute !== 1)
                minuteWord += 's';
        };
        let pastOrTo = isPast ? 'past' : 'to';

        word = `${minuteWord} ${pastOrTo} ${numberToWord.get(hour)}`;
    }

    return word;
}

function main() {
    let inputs = [`5
    47`, `3
    00`, `7
    15`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const h = parseInt(lines[index++], 10), m = parseInt(lines[index++], 10);

        let result = timeInWords(h, m);
        console.log(result + "\n");
    }
}