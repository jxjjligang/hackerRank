'use strict'

main();

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    let set = new Set(scores);
    let distinct = Array.from(set).sort((a, b) => b - a);

    /**
     * orderedArr is in descending order
     * @param {*} orderedArr 
     * @param {*} value 
     */
    function binarySearch(orderedArr, value) {
        let firstIndex = 0, lastIndex = orderedArr.length - 1;
        if (value >= orderedArr[firstIndex])
            return firstIndex;

        if (value < orderedArr[lastIndex])
            return lastIndex + 1;
        if (value === orderedArr[lastIndex])
            return lastIndex;

        let start = 0, end = orderedArr.length - 1, middle = Math.floor((start + end) / 2);
        while (end >= start) {
            if (orderedArr[middle] >= value) {
                if (orderedArr[middle + 1] < value)
                    return (orderedArr[middle] === value ? middle : middle + 1);
                else  // True: orderedArr[middle - 1] < value 
                    start = middle + 1;
            }
            else {  // True: orderedArr[middle] < value
                end = middle;
            }
            middle = Math.floor((start + end) / 2);
        }
    }

    return alice.map(a => binarySearch(distinct, a) + 1);
}

function main() {
    let inputs = [`100
    997 981 957 933 930 927 926 920 916 896 887 874 863 863 858 847 815 809 803 794 789 785 783 778 764 755 751 740 737 730 691 677 652 650 587 585 583 568 546 541 540 538 531 527 506 493 457 435 430 427 422 422 414 404 400 394 387 384 374 371 369 369 368 365 363 337 336 328 325 316 314 306 282 277 230 227 212 199 179 173 171 168 136 125 124 95 92 88 85 70 68 61 60 59 44 43 28 23 13 12
    200
    12 20 30 32 35 37 63 72 83 85 96 98 98 118 122 125 129 132 140 144 150 164 184 191 194 198 200 220 228 229 229 236 238 246 259 271 276 281 283 287 300 302 306 307 312 318 321 325 341 341 341 344 349 351 354 356 366 369 370 379 380 380 396 405 408 417 423 429 433 435 438 441 442 444 445 445 452 453 465 466 467 468 469 471 475 482 489 491 492 493 498 500 501 504 506 508 523 529 530 539 543 551 552 556 568 569 571 587 591 601 602 606 607 612 614 619 620 623 625 625 627 638 645 653 661 662 669 670 676 684 689 690 709 709 710 716 724 726 730 731 733 737 744 744 747 757 764 765 765 772 773 774 777 787 794 796 797 802 805 811 814 819 819 829 830 841 842 847 857 857 859 860 866 872 879 882 895 900 900 903 905 915 918 918 922 925 927 928 929 931 934 937 955 960 966 974 982 988 996 996`,
        `7
    100 100 50 40 40 20 10
    4
    5 25 50 120`, `6
    100 90 90 80 75 60
    5
    50 65 77 90 102`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;

        const scoresCount = parseInt(lines[index++], 10);

        const scores = lines[index++].split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

        const aliceCount = parseInt(lines[index++], 10);

        const alice = lines[index++].split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

        let result = climbingLeaderboard(scores, alice);

        console.log(result.join("\n") + "\n");
    }
}