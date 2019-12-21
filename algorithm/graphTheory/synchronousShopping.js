'use strict'

countTime(main)();

/*
 * Complete the 'shop' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. STRING_ARRAY centers
 *  4. 2D_INTEGER_ARRAY roads
 */

function shop(n, k, centers, roads) {
    function initCenter2Fishes(centers) {
        let center2Fishes = new Map(), center = 1;
        for (let centerString of centers) {
            let centerArr = centerString.split(' ').map(s => parseInt(s)), fishes = 0;
            centerArr.shift();
            for (let fish of centerArr)
                fishes += (1 << (fish - 1));

            center2Fishes.set(center++, fishes);
        }

        return center2Fishes;
    }

    function initCenter2Roads(roads) {
        function addToMap(map, center, road) {
            let roads;
            if (map.has(center))
                roads = map.get(center);
            else {
                roads = [];
                map.set(center, roads);
            }
            roads.push(road);
        }

        let center2Roads = new Map();
        for (let road of roads) {
            let start = road[0], end = road[1];
            addToMap(center2Roads, start, [end, road[2]]);
            addToMap(center2Roads, end, [start, road[2]]);
        }

        return center2Roads;
    }

    function addVisitedCenter(map, center, boughtFish, runningDist) {
        let fish2Dist;
        if (map.has(center))
            fish2Dist = map.get(center);
        else {
            fish2Dist = new Map();
            map.set(center, fish2Dist);
        }

        if (!fish2Dist.has(boughtFish) || fish2Dist.get(boughtFish) > runningDist) {
            fish2Dist.set(boughtFish, runningDist);
            return true;
        }
        else
            return false;
    }

    function getMinimumDistance(distMap) {
        let fish2Dist = distMap.get(n), fishes = Array.from(fish2Dist.keys()), result = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < fishes.length; i++) {
            let fishI = fishes[i];
            for (let j = 0; j < fishes.length; j++) {
                let fishJ = fishes[j];
                if ((fishI | fishJ) === ALL_FISHES)
                    result = Math.min(result, Math.max(fish2Dist.get(fishI), fish2Dist.get(fishJ)));
            }
        }
        return result;
    }

    const ALL_FISHES = (1 << k) - 1, FIRST_CENTER = 1;
    let distMap = new Map();    // dist saves [minimus distance] of per [center + can bought fishes];
    let center2Fishes = initCenter2Fishes(centers), center2Roads = initCenter2Roads(roads);

    let firstCenterObj = { center: FIRST_CENTER, runningDist: 0, boughtFish: center2Fishes.get(FIRST_CENTER) };
    addVisitedCenter(distMap, FIRST_CENTER, center2Fishes.get(FIRST_CENTER), firstCenterObj.runningDist);
    let queue = [firstCenterObj], visited = new Map();
    visited.set(FIRST_CENTER + ':' + center2Fishes.get(FIRST_CENTER), 0);
    let computation = 0;
    while (queue.length > 0) {
        let vertexObj = queue.shift(), center = vertexObj.center;
        let roads = center2Roads.get(center);
        for (let road of roads) {
            let nextCenter = road[0];
            let totalFish = (vertexObj.boughtFish | center2Fishes.get(nextCenter));
            let totalDist = vertexObj.runningDist + road[1];
            let nextKey = nextCenter + ':' + totalFish;

            if (addVisitedCenter(distMap, nextCenter, totalFish, totalDist)) {
                let nextObj = { center: nextCenter, runningDist: totalDist, boughtFish: totalFish };
                if (queue.find(obj => obj.center === nextCenter && obj.runningDist === totalDist && obj.boughtFish === totalFish) === undefined) {
                    queue.push(nextObj);
                    computation++;
                }
            }
        }
    }

    console.log(`computation: ${computation}`);
    return getMinimumDistance(distMap);
}

function main() {
    let inputs = [`300 500 9
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    2 4 6
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 6
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 4
    0
    0
    1 3
    0
    1 1
    0
    0
    0
    1 8
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 7
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 7
    0
    0
    0
    0
    0
    0
    0
    1 2
    0
    1 6
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 2
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 8
    1 9
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 5
    0
    0
    0
    0
    0
    0
    0
    1 3
    0
    0
    0
    0
    0
    0
    0
    1 6
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 4
    0
    0
    1 1
    0
    1 7
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1 5
    0
    0
    0
    0
    0
    0
    1 8
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    276 261 452
    11 5 119
    91 176 818
    32 179 681
    44 81 641
    148 114 931
    210 161 128
    282 108 555
    205 98 277
    21 3 541
    71 42 971
    108 154 129
    169 69 118
    61 7 279
    22 53 292
    26 74 15
    286 276 621
    204 33 415
    47 14 578
    47 293 449
    55 56 735
    8 27 678
    130 125 305
    68 111 337
    129 119 173
    230 69 612
    16 62 449
    214 74 284
    66 203 570
    202 276 109
    164 62 218
    39 52 474
    30 162 116
    194 34 748
    179 257 912
    205 202 968
    56 158 463
    23 5 31
    223 199 561
    135 110 361
    292 291 392
    180 190 945
    166 82 838
    137 19 293
    35 33 523
    3 5 531
    3 151 659
    150 61 452
    236 287 739
    140 114 296
    284 166 579
    90 28 450
    167 175 169
    126 200 30
    57 65 754
    93 138 57
    38 160 50
    300 181 841
    112 292 510
    295 42 419
    243 118 955
    153 295 582
    276 85 42
    93 24 860
    64 146 775
    68 53 413
    99 170 940
    4 201 596
    129 54 103
    27 67 255
    41 40 237
    74 77 346
    5 35 134
    182 151 658
    184 30 24
    122 201 742
    27 251 576
    83 35 217
    32 102 310
    158 33 425
    88 192 403
    167 268 673
    48 97 912
    136 125 778
    72 41 773
    228 107 872
    25 220 502
    6 164 752
    270 169 972
    115 168 462
    1 2 67
    7 82 199
    11 26 97
    296 51 373
    262 105 649
    179 256 824
    218 219 620
    154 163 319
    46 70 597
    181 99 152
    48 119 723
    139 94 446
    69 124 9
    27 133 962
    196 247 644
    244 127 473
    87 28 701
    281 7 499
    150 169 861
    34 103 361
    261 176 440
    66 213 970
    155 178 354
    235 177 545
    39 17 439
    45 291 749
    2 10 584
    136 196 109
    131 226 707
    142 50 648
    218 3 88
    22 257 398
    155 22 62
    221 250 896
    182 243 422
    210 80 799
    134 32 698
    36 42 302
    54 114 645
    182 29 202
    94 74 353
    130 265 838
    79 85 232
    67 98 933
    2 6 33
    43 55 688
    11 292 318
    270 178 321
    293 183 522
    78 256 889
    14 225 554
    73 169 365
    130 177 753
    100 202 348
    128 16 321
    273 17 897
    32 100 660
    37 35 380
    43 167 946
    96 2 600
    45 33 160
    240 194 866
    120 65 91
    259 166 1000
    132 238 146
    134 296 816
    181 120 244
    242 84 700
    259 15 606
    225 28 453
    216 115 979
    290 130 218
    23 9 901
    171 86 697
    205 161 184
    205 275 218
    22 24 804
    36 279 146
    132 4 769
    167 273 351
    122 267 241
    1 104 972
    82 84 276
    82 136 232
    140 126 93
    176 151 877
    131 157 697
    186 77 829
    7 12 542
    37 245 344
    192 245 471
    234 246 304
    236 128 210
    236 294 677
    170 245 544
    99 36 161
    99 194 185
    42 185 374
    4 291 946
    272 148 382
    93 248 969
    266 278 712
    14 58 863
    197 206 999
    1 49 498
    165 21 729
    1 59 152
    234 243 576
    258 93 134
    76 5 852
    110 107 53
    224 6 650
    258 242 347
    112 221 435
    217 107 471
    9 128 136
    274 104 784
    285 278 687
    69 200 521
    294 240 177
    122 3 325
    28 75 578
    47 158 307
    299 55 303
    80 3 37
    152 102 401
    6 108 507
    21 49 811
    6 163 710
    177 18 64
    260 65 447
    32 250 643
    221 139 3
    17 28 481
    152 133 86
    194 130 763
    142 135 691
    121 69 753
    39 115 21
    165 69 126
    2 156 368
    149 221 189
    69 43 606
    6 16 535
    72 141 687
    197 48 933
    169 16 726
    234 56 925
    284 4 255
    57 79 957
    200 180 92
    213 269 664
    114 180 637
    23 54 792
    126 73 21
    253 3 116
    104 124 184
    4 51 928
    275 283 531
    193 98 778
    62 105 22
    235 67 776
    53 203 880
    245 232 352
    47 144 871
    292 114 25
    260 48 941
    234 143 782
    18 153 996
    60 51 258
    140 119 215
    131 222 508
    168 117 153
    108 287 122
    297 187 600
    190 110 662
    14 30 179
    95 198 812
    148 268 196
    6 57 738
    48 262 717
    10 148 882
    161 137 338
    7 35 378
    239 282 825
    166 36 216
    287 80 193
    184 286 191
    63 89 110
    81 218 801
    145 250 560
    242 161 896
    230 28 105
    251 41 956
    42 44 716
    215 130 835
    33 10 716
    89 228 854
    11 253 405
    7 6 631
    275 238 874
    104 57 713
    188 229 196
    40 269 876
    99 82 671
    198 242 620
    91 31 94
    88 68 77
    3 2 608
    153 197 224
    188 75 53
    209 173 728
    285 296 920
    10 64 360
    28 31 517
    169 180 333
    277 213 285
    266 14 703
    116 279 428
    248 176 396
    9 13 965
    170 171 37
    146 77 501
    109 80 815
    7 14 230
    68 266 77
    2 4 906
    268 134 477
    202 110 63
    184 208 12
    170 146 293
    23 31 70
    264 194 637
    31 156 276
    65 9 252
    51 112 163
    207 77 990
    25 97 586
    165 45 269
    159 107 327
    145 75 248
    12 46 494
    181 147 204
    19 116 561
    4 92 397
    161 215 998
    106 290 813
    112 105 596
    173 171 845
    135 86 439
    10 142 998
    127 50 968
    137 180 91
    144 100 90
    239 33 912
    249 82 986
    50 8 901
    34 205 225
    95 40 558
    32 143 69
    36 267 501
    252 61 965
    271 220 3
    25 251 861
    240 91 629
    152 89 391
    32 17 6
    124 112 505
    139 62 650
    2 123 462
    146 9 480
    298 278 135
    274 2 492
    61 285 221
    42 52 114
    179 216 948
    78 43 608
    147 104 83
    194 231 784
    80 113 906
    93 284 669
    168 22 156
    15 8 811
    9 3 867
    247 149 144
    185 188 852
    154 5 154
    173 265 866
    24 35 793
    103 38 915
    133 232 372
    78 118 135
    155 7 765
    5 132 667
    65 154 61
    73 16 90
    8 177 627
    259 145 295
    10 66 633
    209 35 153
    43 28 63
    263 157 863
    243 231 186
    76 61 11
    9 196 119
    40 17 893
    180 113 195
    186 270 63
    77 209 14
    244 44 259
    266 44 93
    107 195 6
    280 165 692
    258 80 610
    36 30 653
    103 120 661
    216 136 358
    101 119 492
    60 212 193
    255 82 716
    17 193 481
    9 18 251
    106 94 813
    243 82 552
    33 44 157
    63 61 626
    46 218 266
    3 34 182
    244 195 211
    132 241 841
    90 125 274
    12 6 453
    253 275 588
    4 20 836
    253 217 331
    26 48 162
    101 88 320
    172 56 896
    159 7 599
    20 35 775
    148 256 182
    142 114 562
    132 218 458
    191 170 63
    51 199 453
    165 197 536
    86 289 696
    109 281 392
    9 29 123
    180 97 233
    211 127 885
    96 288 671
    186 283 263
    226 182 376
    125 79 475
    22 1 460
    189 28 829
    150 272 265
    204 211 454
    25 3 907
    214 6 23
    154 237 430
    25 248 766
    147 133 743
    17 19 890
    19 42 400
    260 224 828
    14 121 358
    75 4 537
    159 120 151
    187 11 935
    150 57 64
    68 293 770
    107 100 117
    173 215 387
    274 260 917
    98 247 613
    127 253 411
    102 183 225
    4 17 870
    188 233 573
    189 223 917
    86 78 588
    217 167 820
    152 290 351
    138 212 147
    31 133 831
    117 51 333
    39 44 573
    28 131 874
    146 276 504
    196 40 495
    83 149 735
    160 180 658
    216 264 693
    31 234 777
    154 157 781
    262 155 453
    47 31 186
    174 124 187
    8 3 518
    238 22 233
    97 254 578
    25 104 883
    46 227 172
    197 52 865
    38 5 796
    42 46 285
    231 138 965
    81 39 5`,
        `5 5 5
1 1
1 2
1 3
1 4
1 5
1 2 10
1 3 10
2 4 10
3 5 10
4 5 10`];
    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

        const firstMultipleInput = lines[index++].replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10), m = parseInt(firstMultipleInput[1], 10), k = parseInt(firstMultipleInput[2], 10);
        let centers = [];
        for (let i = 0; i < n; i++) {
            const centersItem = lines[index++];
            centers.push(centersItem);
        }

        let roads = Array(m);
        for (let i = 0; i < m; i++)
            roads[i] = lines[index++].replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));

        const res = shop(n, k, centers, roads);
        console.log(res + '\n');
    }
}

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