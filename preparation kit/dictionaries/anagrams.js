'use strict'

function sherlockAndAnagrams(s) {


}

main();
function main() {
    let input = `2
    abba
    abcd`;
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;
    const q = parseInt(lines[index++], 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = lines[index++];

        let result = sherlockAndAnagrams(s);

        console.log(result + "\n");
    }
}