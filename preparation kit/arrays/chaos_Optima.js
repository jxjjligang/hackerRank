// Complete the minimumBribes function below.
function minimumBribes(q) {
 let ans = 0;
    for (let idx = 0; idx < q.length; idx++) {
        let sticker = q[idx];
        if (sticker - (idx + 1) > 2) {
            console.log('Too chaotic');
            return;
        }
        for (let position = Math.max(0, sticker - 2); position < idx; position++) {
            if (q[position] > sticker) {
                ans = ans + 1;
            }
        }
    }

    console.log(ans);
}