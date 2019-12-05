'use strict'
minOperations();

function minOperations() {
    function initialize() {
        let input = `3
        1 1 1
        1 1 1
        1 1 1`;

        input = `4
        4 7 6
        6 4 5
        5 6 3
        7 3 8`;

        let lines = input.split('\n').map(s => s.trim()), index = 0;;

        let n = parseInt(lines[index++])
        for (let i = 0; i < n; i++) {
            let rgb = lines[index++].split(' ').map(s => parseInt(s));
            red.push(rgb[0]);
            green.push(rgb[1]);
            blue.push(rgb[2]);
        }

        for (let i = 0; i <= n; i++) {
            dp[i] = [];
            for (let j = 0; j <= 7; j++)
                dp[i][j] = (Number.MAX_SAFE_INTEGER);
        }
        dp[0][0] = 0;
    }

    let dp = [], red = [], green = [], blue = [];
    initialize();

    let n = red.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= 7; j++) {
            dp[i + 1][j | 1] = Math.min(dp[i + 1][j | 1], dp[i][j] + green[i] + blue[i]);
            dp[i + 1][j | 2] = Math.min(dp[i + 1][j | 2], dp[i][j] + red[i] + blue[i]);
            dp[i + 1][j | 4] = Math.min(dp[i + 1][j | 4], dp[i][j] + red[i] + green[i]);
        }
    }

    let j = 0;
    for (let i = 0; i < n; i++) {
        if (green[i] != 0)
            j |= 1;

        if (red[i] != 0)
            j |= 2;

        if (blue[i] != 0)
            j |= 4;
    }
    if (dp[n][j] >= (Number.MAX_SAFE_INTEGER))
        dp[n][j] = -1;
    console.log(dp[n][j]);
}


