'use strict'

main();



/**
 * Idea: lable the cross cell (of G) with 2, the other G cells with 1, B cells with 0.
 * Then, iterate every 2 cells, calculate its plus value
 * @param {*} grid 
 */
function twoPluses(grid) {
    function findMaxValue(plusArray) {
        // returns true if set1 and set2 has any common element
        function twoArrayOverlap(cells1, cells2) {
            for (let cell of cells1) {
                if (cells2.find(c => c === cell) !== undefined)
                    return true;
            }

            return false;
        }

        function getNonOverlapArea(cells1, cells2) {
            let cells1Copy = cells1.slice(), cells2Copy = cells2.slice();
            while (twoArrayOverlap(cells1, cells2)) {
                let bigger = (cells1.length >= cells2.length ? cells1 : cells2);
                if (bigger.length < 4) {
                    bigger.length = 0;
                    break;
                }
                bigger.length -= 4;
            }

            let area = cells1.length * cells2.length;
            cells1.length = 0;
            cells1.splice(0, 0, ...cells1Copy);

            cells2.length = 0;
            cells2.splice(0, 0, ...cells2Copy);

            return area;
        }

        const PLUS_ARRAY_LENGTH = plusArray.length;
        let maxValue = 0;
        for (let i = 0; i < PLUS_ARRAY_LENGTH - 1; i++) {
            let plusI = plusArray[i];
            for (let j = i + 1; j < PLUS_ARRAY_LENGTH; j++) {
                let plusJ = plusArray[j];
                if (plusI.cells.length * plusJ.cells.length <= maxValue)
                    break;

                let area = getNonOverlapArea(plusI.cells, plusJ.cells);
                if (area > maxValue)
                    maxValue = area;
            }
        }

        return maxValue;
    }

    function findPlus(grid, row, column, plusArray) {
        function validForPlus(cells) {
            for (let cellIJ of cells) {
                if (cellIJ[0] < 0 || cellIJ[0] >= GRID_ROWS || cellIJ[1] < 0 || cellIJ[1] >= GRID_COLUMNS)
                    return false;

                if (grid[cellIJ[0]][cellIJ[1]] !== GOOD_CHAR)
                    return false;
            }
            return true;
        }

        let cell = grid[row][column], cellID = row + ':' + column;
        if (cell === BAD_CHAR)
            return;
        else {
            let size = 1, cellIDs = [];
            cellIDs.push(cellID);
            let adjacentCells = [[row + size, column], [row - size, column], [row, column + size], [row, column - size]];
            while (validForPlus(adjacentCells) === true) {
                for (let cell of adjacentCells)
                    cellIDs.push(cell[0] + ':' + cell[1]);
                size++;
                adjacentCells = [[row + size, column], [row - size, column], [row, column + size], [row, column - size]];
            }
            plusArray.push({ center: cellID, cells: cellIDs });
        }
    }

    const GOOD_CHAR = 'G', BAD_CHAR = 'B';
    const GRID_ROWS = grid.length, GRID_COLUMNS = grid[0].length;

    let plusArray = []
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let column = 0; column < GRID_COLUMNS; column++)
            findPlus(grid, row, column, plusArray);
    }

    plusArray.sort((a, b) => b.cells.length - a.cells.length);
    return findMaxValue(plusArray);
}

// expects 81, 169, 81, 45, 5, 5, 25
function main() {
    let inputs = [`10 9
    BBBGBGBBB
    BBBGBGBBB
    BBBGBGBBB
    GGGGGGGGG
    BBBGBGBBB
    BBBGBGBBB
    GGGGGGGGG
    BBBGBGBBB
    BBBGBGBBB
    BBBGBGBBB`,
        `12 12
    GGGGGGGGGGGG
    GBGGBBBBBBBG
    GBGGBBBBBBBG
    GGGGGGGGGGGG
    GGGGGGGGGGGG
    GGGGGGGGGGGG
    GGGGGGGGGGGG
    GBGGBBBBBBBG
    GBGGBBBBBBBG
    GBGGBBBBBBBG
    GGGGGGGGGGGG
    GBGGBBBBBBBG`
        , `11 13
    BBGGBBGBBGBBG
    BBGGBBGBBGBBG
    GGGGGGGGGGGGG
    BBGGBBGBBGBBG
    GGGGGGGGGGGGG
    BBGGBBGBBGBBG
    BBGGBBGBBGBBG
    GGGGGGGGGGGGG
    BBGGBBGBBGBBG
    GGGGGGGGGGGGG
    BBGGBBGBBGBBG`,
        `8 8
    GGGGGGGG
    GBGBGGBG
    GBGBGGBG
    GGGGGGGG
    GBGBGGBG
    GGGGGGGG
    GBGBGGBG
    GGGGGGGG`,
        `7 7
    GBGBGGB
    GBGBGGB
    GBGBGGB
    GGGGGGG
    GGGGGGG
    GBGBGGB
    GBGBGGB`,
        `6 7
    GGGGGGG
    BGBBBBG
    BGBBBBG
    GGGGGGG
    GGGGGGG
    BGBBBBG`,
        `5 6
GGGGGG
GBBBGB
GGGGGG
GGBBGB
GGGGGG`,
        `6 6
BGBBGB
GGGGGG
BGBBGB
GGGGGG
BGBBGB
BGBBGB`];
    for (let i = 0; i < inputs.length; i++) {    // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);

        let grid = [];
        for (let i = 0; i < n; i++) {
            const gridItem = lines[index++];
            grid.push(gridItem);
        }

        let result = twoPluses(grid);
        console.log(result);
    }
}
