'use strict'

function isValid(s) {
    let char2Count = new Map();
    for (let i = 0; i < s.length; i++) {
        let char = s[i], count = char2Count.has(char) ? char2Count.get(char) + 1 : 1;
        char2Count.set(char, count);
    }
    let countArr = Array.from(char2Count.values()), countSet = new Set(countArr), setSize = countSet.size;
    if (setSize === 1)
        return 'YES';   // every character has the same size;
    else if (setSize === 2) {
        if (countArr.filter(e => e === 1).length === 1)
            return 'YES';

        let maxCount = Math.max(...countSet), minCount = Math.min(...countSet);
        if ((maxCount - minCount) !== 1)
            return 'NO';

        if (countArr.filter(e => e === maxCount).length > 1)
            return 'NO';
        else
            return 'YES';
    }
    else
        return 'NO';
}

main();
function main() {


    let input = `aabbcd`;
    // input = 'abcdefghhgfedecba';

    input = `ibfdgaeadiaefgbhbdghhhbgdfgeiccbiehhfcggchgghadhdhagfbahhddgghbdehidbibaeaagaeeigffcebfbaieggabcfbiiedcabfihchdfabifahcbhagccbdfifhghcadfiadeeaheeddddiecaicbgigccageicehfdhdgafaddhffadigfhhcaedcedecafeacbdacgfgfeeibgaiffdehigebhhehiaahfidibccdcdagifgaihacihadecgifihbebffebdfbchbgigeccahgihbcbcaggebaaafgfedbfgagfediddghdgbgehhhifhgcedechahidcbchebheihaadbbbiaiccededchdagfhccfdefigfibifabeiaccghcegfbcghaefifbachebaacbhbfgfddeceababbacgffbagidebeadfihaefefegbghgddbbgddeehgfbhafbccidebgehifafgbghafacgfdccgifdcbbbidfifhdaibgigebigaedeaaiadegfefbhacgddhchgcbgcaeaieiegiffchbgbebgbehbbfcebciiagacaiechdigbgbghefcahgbhfibhedaeeiffebdiabcifgccdefabccdghehfibfiifdaicfedagahhdcbhbicdgibgcedieihcichadgchgbdcdagaihebbabhibcihicadgadfcihdheefbhffiageddhgahaidfdhhdbgciiaciegchiiebfbcbhaeagccfhbfhaddagnfieihghfbaggiffbbfbecgaiiidccdceadbbdfgigibgcgchafccdchgifdeieicbaididhfcfdedbhaadedfageigfdehgcdaecaebebebfcieaecfagfdieaefdiedbcadchabhebgehiidfcgahcdhcdhgchhiiheffiifeegcfdgbdeffhgeghdfhbfbifgidcafbfcd`;
    input = 'aaaabbcc';
    let lines = input.split('\n').map(l => l.trim()).filter(l => l !== ''), index = 0;

    const s = lines[index++];
    let result = isValid(s);
    console.log(result);
}