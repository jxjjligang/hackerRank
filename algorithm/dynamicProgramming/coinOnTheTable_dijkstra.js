'use strict'
main();

function coinOnTheTable(m, k, board) {
    const ROW_COUNT = board.length, COLUMN_COUNT = m, STAR = '*', BASE = 100;
    //                  left,    right,  up,      down                  
    const NEIGHBOURS = [[0, -1], [0, 1], [-1, 0], [1, 0]], NEIGHBOUR_LETTERS = ['L', 'R', 'U', 'D'];

    function getNodeKey(node) {
        return node[0] * BASE + node[1];
    }

    function getNodeKeyByXY(x, y) {
        return x * BASE + y;
    }

    let grid = [], END_ROW = -1, END_COLUMN;
    for (let i = 0; i < ROW_COUNT; i++) {
        let line = board[i];
        let cells = line.split('');
        grid.push(cells);
        if (END_ROW === -1) {
            END_COLUMN = cells.findIndex(element => element === STAR);
            if (END_COLUMN !== -1)
                END_ROW = i;
        }
    }

    // use BFS to find the minChange value between [start node] and [all other nodes]
    let startNode = [0, 0], nodeKey2MinChange = new Map([[getNodeKey(startNode), 0]]), queue = [[startNode[0], startNode[1], 0]];
    while (queue.length > 0) {
        queue.sort((n1, n2) => {
            if (n1[2] !== n2[2])
                return n1[2] - n2[2];

            let n1Key = getNodeKey(n1), n2Key = getNodeKey(n2);
            return nodeKey2MinChange.get(n1Key) - nodeKey2MinChange.get(n2Key);
        });
        let minChangesNode = queue.shift(), currentX = minChangesNode[0], currentY = minChangesNode[1], currentNodeKey = getNodeKeyByXY(currentX, currentY), spentTime = minChangesNode[2];
        if (spentTime >= k)
            continue;

        let changesAlreadyMade = nodeKey2MinChange.get(currentNodeKey), totalChanges = changesAlreadyMade;
        for (let i = 0; i < NEIGHBOURS.length; i++) {
            let neighbour = NEIGHBOURS[i];
            let nextX = currentX + neighbour[0], nextY = currentY + neighbour[1];
            // check if [nxet node location] is valid
            if (nextX < 0 || nextX >= ROW_COUNT || nextY < 0 || nextY >= COLUMN_COUNT)
                continue;

            let nextNodeKey = getNodeKeyByXY(nextX, nextY);
            totalChanges = (grid[currentX][currentY] !== NEIGHBOUR_LETTERS[i]) ? (1 + changesAlreadyMade) : changesAlreadyMade;
            let lessChangesFound = (nodeKey2MinChange.has(nextNodeKey) === false) || (totalChanges < nodeKey2MinChange.get(nextNodeKey));
            if (lessChangesFound === false)
                continue;
            else
                nodeKey2MinChange.set(nextNodeKey, totalChanges);

            queue.push([nextX, nextY, 1 + spentTime]);  // push [next node]  into stack
        }
    }   // the end of while (queue.length > 0) {

    let endNodeKey = getNodeKeyByXY(END_ROW, END_COLUMN);
    if (nodeKey2MinChange.has(endNodeKey) === false)
        return -1;

    let minChanges = nodeKey2MinChange.get(endNodeKey);
    return minChanges > k ? -1 : minChanges;
}

function main() {
    let inputs = [`3 3 5
    RRD
    DLL
    *UU`
        , `18 42 42
    DUDDDLLRURULLDLURURLDLRULDURLDDURLUURLURRU
    DLDLURDRRLDDLDULRUDURDDUURDLLLLRRLDUULLDDD
    RULURDLLUULDRDDLLDLRDUDRDDRRRDRUDRURURLRLD
    RLUDLLLUURRDRRDRDRLDLDDDULLRRLLRLDLUDRDDUU
    RDDRURLRUUDLLRLULLLLULLDLUDRLDRDDURDLRDRLL
    LDRDDDLDUDLDUDRLURRDLURRRDLDURLULDDURDUDLU
    UDUULDRUULUDL*UDULUDLLRRLULULUDULURLRDULLL
    UDLDRLDLDLRRULURDRUDRLDLLDDRLRRLRUURLUDULR
    RULDDLUULRRDRDLUULRULDRRUULULLUDRLLRLLDRRR
    ULRLDDDUUDLLRLURRURLDRULRRDUDRULUDDRDLULDD
    DDDRDRRULRLUUDRRDDLDUDRLRRRDLRDRLUDRULLLDR
    DUDULULRLUDRLRLLLUUURRDLLRRLLLDUDLDRDDURRR
    UULDRUULRDDRDLUDLLLULULRRUUUULDDDRRRUDLLDU
    LLLURRRDRUUULDLLLDDDLLRLDLLURUDLRLDLDDLLUL
    LLLDDDDULDRURULULLULLUDRDURRRRUUURRLURDURL
    RDDDDDLRRRRLRUDRLURRLRRUUUUURULULRRDRUUDUU
    RDUURUULLDULRUULRRLLDDLRURDULRDLUDDDURDRUD
    LUDLDDRDURUDLLLDRLRRRLRDULLLDLDUUUDRRDRLRU`
        , `50 50 4
    RURDRDRLDLUDLDURURRDDLLLURLUDRRRUDRDLULDRRULDLDDRL
    RRRURDULDLRRLURDRDURUDDDDRURUUUULUULLDDUUUULURURRU
    URLDDRRDDLRDLLRRUURDLDRURUDUDDLDLDUUDDLLDRRDDRDLRR
    RLLRRLUDRDULLDLDRLLRULRDRRDRRDDRLDLDURUUULLDURLDLD
    LDUULRRLRUUDDLLDLDULULUUURRDRDUDLLRLRDLDLRRLDLUURD
    LRRDRLRURDRDRUUUUDRLDUDDLRULRUDLLRLRDRLUDRLRLLLDUU
    LDULDRLURDULUURUDULDUUDLLDURDUULRLDDRLRUDRRLURULLL
    UDDLRDDUDUDDLDULRUDLUDLUULLLUDRLUDDLLLUULDURDRULRL
    RLLLULDURDULRDLLRRURLDDLUUDRUUUUURUURDURDULUDDULRD
    LUUUURRURLUDRURLLDDLLUDDRLLRURULUULULRURLDUUUURRUD
    UDLDURDUULRLDURLLLLURDLLRLDULRURRRLUDURURRDLULDRDL
    DURRLUDUULLLLULURLURDLRRUDRLLRDLURDLLUDUUURLLLDRDD
    RDDLULLLLDRDUDUDULLURLDDRDRLLDLULDULLDULRUULUUDLUD
    LRRRUDRUULUUDLDULDDLUUUURLDDLULDDLLDUDDLLLRUDDLLDU
    UULLDRDRRLRDUULDRULDULRRLDUULDURUDUURLRLRDRURRLDDD
    DLDLDLLDRULUURLUUUUUUDDRULDURLRLLUDRURLRULRRUDDUDL
    LDDULRLURRDDUDDLUDDUDUDDDLRLLLUURLURLLRRULLLRDRRLU
    LUUULLDLDRLRLULRUUDRRUDRLUDUDUDRLUUURLURUUDDULDRUD
    LDLDRDDLLDDLUULULULDDDLRDLDULDDLLLDRDRDRRDLLRLDUDR
    ULURUDRLLDLRDLDURUDUURDLRRULDLLDURRLDULLRULLLLULLL
    RRDULLDLUUDURDRULURURULUDRRUURLLUUURLDDRRLRLDULUUR
    RDDRURLULUDULUUDDDULRDLLDUULDLRDLLULDUUDRDDLDRDDDD
    DLLRRDLDRRLRDRDDUUDLLLRULRRDDDLUURRRURRRDDLDDLDDLU
    LRRLDDLDRDRLDDULLRDDLRLRULDLRRULLDDRDRDULRDUDRRLRR
    UUDDLDLDUDUDDUULDDLUDLLDUULLULRLDURRUUUDLRDRLRLLLU
    LRLLRRUDLLRDLLRRUDRRULRDRDDUUDRULRRURLDLDRRLRLDLDD
    URRDRDDUDUDURLLDDLRDLUULUULLRDDRDDLDLDRRDUDRDLDUUD
    RURRRLLDULUDRRRRUDLUDULUULUDRLRUDDRLDUDDLRULUURRRL
    LLRUULUUUUDURLLRLDLLLDULURRLRDULDLDURLRURLUUDDLUUD
    RLLRLULRDUULRLUULLULDRRLURDRUDLDUUDUDRDRRDRLLULLDU
    LDDLLDLURRRRRLLLUDDDUURLURRDDRUDDUDLLRUDDULUULDRRU
    RRLDURLLDDRUUDUURUURURUDDULDLULUUDDUUUDDRRLRUDDLLR
    RDLDURULDRDLDDURDUUDLLRDDURLULLDDRLLURULDURRLRDDLR
    DUUURLURLRULDLLRURLDDUUDLRLLRRLDDLRRDRRDDURDRURRUD
    RURLLRLDDUURUDDUDLURDLRDRDURUDLUDLRRDUUURLRLDLURUD
    RLLDUULURLLRLDDDLLULDDDLRRLDRDURLDDDDULDLDUDLDULUD
    RURLUUDULRUURURRLDDUULDRUDLDDRRRRRLDDLDLRDLLRLRRDR
    LRUUUDLUUDRRRRLLLRLLRUURLRRLLUDUULRRRUURRR*LRLLRDD
    URRLDUDDLRLURDULLURLLDRDRURDLULDLLRRDDURRDDRULDLDL
    RLDRDRUUDURDDLLLULLLDLULRLDDLLRLUDULLLDDLURULUULUL
    RLRRLLDRLRRRDRDURRLDRDLLDLLDDLUULURUURLRUDRUUDDLUD
    UDLURRULDULUDDRDRRLDRRDDURLURDDDDDLLLRUDLUUDLULUDU
    URRLDRLDUULLLRLRUDDRULLRLLDURDUUULUULUDDLLDRURRRLD
    LDDDLDDRRDLUDDDRLLUULDDUDUDDDULURRLRLLUUDLDDRDRDRR
    UDDDDULRULUUDLLRUDULRDLRULLLURURUUDLLRLLDRURRRRRDD
    LULUDLDLDDRRLDURUUULDLURRUUDUDLUURDRDLRRRLDRDDRDUD
    RUULRUDRRLULDDUDDDULLLDRULUDRLLLRDRUURLLDLRDDRLUUD
    URDULDDURLLLLDDDLURRRLRULRLLDLUDDRRRULRRRRLLDLUUDL
    LLLDLURUDLDRURRLDDLDLLURUDRDUDLDRRLRDLUUDLULULUULU
    LLURLDUULUURULLLDURRUUUDLUDLRURULDLUURRRULURRRLULD`
        , `20 17 47
    DRLULLRRRLRDLRRLU
    URUURLRLLLDULRRRR
    DRDLDDLDRRDRURRLR
    DRRRRRRLDULDDUDLD
    DULRDDULDUDULRDUD
    LRURUDURRUURDDUDL
    URURDLRUULRRDLDLR
    DLRUDLDRUUDULUDUU
    *ULLURDRDUURLDRDR
    ULDUDUUULLURURURR
    LDRDLDRRLDDRRLRLD
    RDDLURRRDDLRDURLD
    ULRLRLRRLLLRRURRL
    RLLLDRDURLRURLUDD
    DRLDURRLURUULLRDU
    RURRUDLLLDDDRUUUD
    UUUUDDLRURULRRDRD
    URDUUDRDLDRLLULRU
    DRDUUULUUDURULDDL
    LLULDRLRRRUDLDRRU`
        , `2 2 3  
    RD  
    *L`,
        `2 2 1  
    RD  
    *L`]; for (let i = 0; i < inputs.length; i++) {        // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const nmk = lines[index++].split(' '), n = parseInt(nmk[0], 10), m = parseInt(nmk[1], 10), k = parseInt(nmk[2], 10);

        let board = [];
        for (let boardItr = 0; boardItr < n; boardItr++) {
            const boardItem = lines[index++];
            board.push(boardItem);
        }

        let result = coinOnTheTable(m, k, board);
        console.log(result);
    }
}
