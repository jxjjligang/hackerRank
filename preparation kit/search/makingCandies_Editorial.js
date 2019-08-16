'use strict'

function countTime(func) {
    let savedThis = this;
    return function (...args) {
        let start = new Date();
        let result = func.apply(savedThis, args);
        let end = new Date();
        console.log(`${((end - start) / 1000).toFixed(1)} seconds spent.`);
        return result;
    }
}

function minimumPasses(m, w, p, n) {
    function check(machines, workers, price, target, rounds) {
        if (machines >= (target + workers - 1) / workers)
            return true;

        let produced = machines * workers;
        rounds--;
        if (rounds === 0)
            return false;

        while (true) {
            let rem = target - produced;
            let rnds = Math.floor((rem + machines * workers - 1) / (machines * workers));
            if (rnds <= rounds)
                return true;

            if (produced < price) {
                rem = price - produced;
                rnds = Math.floor((rem + machines * workers - 1) / (machines * workers));
                rounds -= rnds;
                if (rounds < 1)
                    return false;

                produced += rnds * machines * workers;
            }
            produced -= price;
            if (machines > workers)
                workers++;
            else
                machines++;
        }

        return false;
    }


    let minPass = 1, maxPass = 1000000000000;
    while (minPass < maxPass) {
        let middle = Math.floor((minPass + maxPass) / 2);
        if (check(m, w, p, n, middle))
            maxPass = middle;
        else
            minPass = middle + 1;
    }

    return minPass;
}

main();

function main() {
    let input = `3 1 2 12`;

    let lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
    const mwpn = lines[index++].split(' ');
    const m = parseInt(mwpn[0], 10), w = parseInt(mwpn[1], 10);
    const p = parseInt(mwpn[2], 10), n = parseInt(mwpn[3], 10);

    let result = minimumPasses(m, w, p, n);
    console.log(result + "\n");
}
