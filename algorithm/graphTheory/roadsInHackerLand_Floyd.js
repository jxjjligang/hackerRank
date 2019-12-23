'use strict'

main();

// This algothrim works but can't pass performance tests because its time complexity is O(n^3)

/*
 * Complete the roadsInHackerland function below.
 */
function roadsInHackerland(n, roads) {
    function removeDuplicateRoad(roads) {
        let roadKey2Cost = new Map(), changed = false;
        for (let road of roads) {
            let smaller = (road[0] < road[1] ? road[0] : road[1]), bigger = (road[0] > road[1] ? road[0] : road[1]), roadKey = smaller + ':' + bigger, cost = road[2];
            if (!roadKey2Cost.has(roadKey) || (roadKey2Cost.get(roadKey) > cost))
                roadKey2Cost.set(roadKey, cost);
        }

        if (roadKey2Cost.size === roads.length)
            return roads;
        else {
            let finalArr = [];
            for (let kv of roadKey2Cost) {
                let roadKey = kv[0], cost = kv[1], matchResult = roadKey.match(/(\d+):(\d+)/);
                finalArr.push([matchResult[1], matchResult[2], cost]);
            }

            return finalArr;
        }
    }

    function mergeExponentArray(arr1, arr2) {
        function addToMap(map, exponent) {
            if (!map.has(exponent)) {
                map.set(exponent, 1);
                return;
            }

            let existingValue = map.get(exponent);
            if (existingValue === 1) {
                map.delete(exponent);
                addToMap(map, exponent + 1);
            }
            else {
                throw Exception('function mergeExponentArray, Unexpected scenario.');
            }
        }

        if (arr1.length === 0)
            return arr2;
        else if (arr2.length === 0)
            return arr1;

        // both of them are not empty
        let merged = new Map();
        for (let exponentValue of arr1)
            addToMap(merged, exponentValue);
        for (let exponentValue of arr2)
            addToMap(merged, exponentValue);

        let finalArr = Array.from(merged.keys()).sort((a, b) => b - a);
        return finalArr;
    }

    /**
         * Both existingCostArr and runnningCostArr are in descending order
         * return 0 if they equals
         * return -1 if existingCostArr < runnningCostArr
         * return -1 if existingCostArr > runnningCostArr
         * */
    function compareArrays(existingCostArr, runnningCostArr) {
        let index = 0;
        while (true) {
            let existingCost = existingCostArr[index], runnningCost = runnningCostArr[index];
            if (existingCost === undefined && runnningCost === undefined)
                return 0;
            else if (existingCost === undefined)
                return -1;
            else if (runnningCost === undefined)
                return 1;

            if (existingCost < runnningCost)
                return -1;
            else if (existingCost > runnningCost)
                return 1;

            index++;
        }
    }

    let dist = [];
    for (let i = 0; i < n; i++) {
        let arr = [];
        arr[i] = [];
        dist.push(arr);
    }

    roads = removeDuplicateRoad(roads);
    let i = 1;
    for (let road of roads) {
        let cost = [road[2]];
        dist[road[0] - 1][road[1] - 1] = cost;
        dist[road[1] - 1][road[0] - 1] = cost;
    }

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== undefined && dist[k][j] !== undefined) {
                    let runnningCostArr = mergeExponentArray(dist[i][k], dist[k][j]);
                    if (dist[i][j] === undefined || compareArrays(dist[i][j].sort((a, b) => b - a), runnningCostArr) > 0)
                        dist[i][j] = runnningCostArr;
                }
            }
        }
    }

    // for (let i = 0; i < dist.length; i++) {
    //     let row = dist[i];
    //     console.log(row.join(' '));
    // }
    // console.log();

    let total = 0n;
    for (let i = 0; i < dist.length; i++) {
        let row = dist[i];
        for (let j = i + 1; j < row.length; j++) {
            for (let exponent of row[j]) {
                total += (2n ** BigInt(exponent));
            }
        }
    }

    return total.toString(2);
}

function main() {
    let inputs = [`300 350
    67 12 346
    299 226 42
    226 285 206
    218 253 167
    125 96 177
    123 5 156
    167 179 19
    280 3 300
    265 44 242
    116 277 153
    235 289 6
    202 242 56
    244 239 78
    123 109 141
    71 20 349
    212 221 134
    6 229 23
    211 207 202
    32 38 284
    203 41 245
    229 169 157
    115 209 337
    32 180 345
    260 232 244
    150 114 147
    206 80 331
    201 198 143
    107 167 305
    132 228 225
    90 216 233
    62 11 85
    99 270 79
    154 298 280
    256 276 28
    153 236 93
    69 297 330
    222 262 322
    19 64 166
    26 27 53
    162 107 256
    183 231 125
    180 213 145
    152 234 312
    103 127 291
    97 294 13
    111 9 169
    24 198 111
    179 273 162
    270 92 207
    231 279 71
    248 273 246
    267 38 64
    73 179 105
    73 126 237
    87 217 289
    186 76 316
    223 266 94
    48 140 180
    74 107 252
    282 237 279
    148 56 128
    33 204 129
    16 151 17
    15 295 114
    178 148 329
    288 41 182
    85 276 194
    250 168 265
    237 45 121
    213 196 296
    81 158 84
    210 97 268
    185 82 136
    4 92 127
    194 284 336
    143 17 55
    15 17 223
    188 176 285
    264 132 82
    69 84 24
    230 220 226
    128 299 323
    277 29 229
    27 261 317
    71 297 159
    55 298 306
    100 195 320
    64 199 288
    243 39 253
    173 204 258
    105 120 290
    49 251 189
    286 2 65
    150 61 130
    108 176 86
    87 233 133
    222 7 250
    228 129 10
    196 34 171
    141 35 131
    30 285 109
    170 86 43
    93 101 148
    171 263 154
    159 95 73
    66 121 39
    25 145 15
    91 235 319
    68 297 81
    199 13 8
    89 268 45
    293 154 321
    82 115 274
    27 101 228
    299 8 307
    53 291 309
    29 218 117
    239 75 293
    152 74 198
    2 121 222
    178 237 213
    177 285 184
    82 15 88
    151 161 347
    1 227 238
    175 215 311
    65 93 123
    252 288 41
    58 102 144
    295 189 90
    197 202 87
    20 28 239
    83 73 132
    171 267 35
    295 290 100
    150 226 124
    194 253 151
    10 292 257
    124 52 235
    214 120 211
    205 175 314
    221 108 38
    101 209 77
    254 53 161
    149 298 29
    298 229 297
    34 236 119
    232 86 110
    61 13 261
    163 157 232
    208 271 266
    170 230 287
    37 102 333
    40 37 103
    104 45 218
    14 245 341
    1 118 20
    129 217 57
    31 200 32
    56 210 62
    287 136 96
    240 114 210
    208 88 273
    116 161 49
    178 183 243
    269 84 106
    96 274 69
    29 281 263
    220 259 264
    227 5 191
    233 290 107
    277 189 51
    144 298 7
    148 214 97
    187 281 4
    299 76 342
    166 216 46
    191 137 155
    8 172 89
    39 146 301
    80 235 240
    67 143 241
    83 81 251
    219 53 190
    251 112 176
    279 78 102
    50 51 95
    163 287 58
    135 113 269
    190 66 178
    80 78 332
    109 161 0
    114 7 108
    185 135 224
    154 134 299
    273 182 174
    198 300 22
    258 271 47
    223 88 276
    186 298 146
    193 138 262
    149 146 267
    194 287 315
    141 242 340
    278 255 338
    125 157 135
    186 131 172
    153 112 91
    23 184 326
    199 17 270
    260 36 168
    43 96 116
    145 89 61
    254 67 193
    226 280 74
    30 3 40
    110 238 50
    147 124 150
    64 130 31
    18 168 120
    137 279 34
    294 261 247
    158 172 188
    139 71 152
    111 70 12
    112 62 76
    143 48 59
    147 243 181
    291 23 36
    275 195 3
    201 122 271
    93 115 254
    42 127 278
    207 170 9
    95 219 208
    163 262 310
    43 259 328
    63 68 325
    122 241 80
    278 156 126
    166 145 339
    72 57 200
    101 98 308
    190 181 101
    59 11 140
    91 296 344
    177 266 21
    255 248 199
    113 169 185
    119 26 215
    35 98 249
    94 286 231
    49 203 26
    186 79 137
    155 130 60
    252 236 14
    173 126 54
    193 142 92
    272 181 227
    110 155 104
    72 133 170
    165 220 318
    76 194 302
    167 116 1
    193 217 236
    239 206 160
    165 160 115
    231 227 70
    187 299 139
    78 201 98
    87 66 72
    197 253 27
    28 284 343
    256 156 281
    245 246 37
    219 265 334
    152 257 5
    272 164 216
    238 268 48
    46 55 175
    106 244 219
    9 116 18
    10 283 304
    99 28 187
    75 205 99
    224 69 158
    282 144 2
    150 155 149
    4 235 295
    47 70 196
    36 217 192
    8 130 52
    87 224 327
    248 187 209
    249 99 221
    292 19 197
    300 60 163
    140 42 186
    164 234 298
    79 212 248
    22 103 44
    249 225 63
    250 33 11
    12 192 83
    160 65 259
    57 24 25
    138 58 260
    21 84 142
    254 206 164
    47 59 113
    174 190 75
    210 253 138
    118 33 283
    85 64 173
    68 51 201
    100 234 294
    32 133 112
    131 296 165
    196 105 205
    204 214 230
    40 88 214
    221 81 33
    34 77 286
    247 215 30
    162 252 212
    188 200 335
    119 289 275
    275 67 118
    201 77 303
    184 246 277
    128 94 183
    16 292 292
    264 60 16
    111 96 122
    44 191 67
    104 40 195
    52 211 324
    13 160 282
    164 258 203
    293 142 234
    30 209 255
    162 247 66
    21 117 68
    185 244 204
    25 136 313
    80 213 220
    106 121 179
    54 274 217
    192 174 272
    153 50 348`, 
        `900 1111
    226 631 133
    142 249 506
    856 305 64
    795 490 47
    509 890 824
    784 804 83
    806 427 63
    91 166 992
    878 675 523
    513 705 1075
    896 405 419
    28 865 543
    814 2 754
    884 506 3
    480 851 777
    192 144 1060
    573 438 578
    21 865 916
    749 188 4
    228 803 281
    136 637 788
    207 620 846
    141 33 240
    365 234 1062
    846 25 737
    460 260 770
    291 124 773
    408 356 555
    882 533 147
    111 275 955
    845 165 19
    274 427 168
    538 286 924
    320 473 653
    251 815 376
    862 761 109
    138 424 566
    326 810 584
    417 289 562
    435 885 1020
    576 171 456
    525 630 963
    479 99 486
    731 784 791
    540 331 757
    416 594 509
    456 554 1050
    306 703 669
    406 671 385
    332 836 639
    809 146 311
    590 867 794
    721 216 20
    820 225 159
    155 139 387
    564 563 528
    651 850 451
    482 285 926
    91 578 776
    175 134 265
    545 120 865
    878 202 640
    107 728 659
    802 419 517
    83 694 592
    303 53 1035
    753 179 627
    12 684 229
    183 428 800
    497 316 817
    9 87 75
    841 588 730
    54 282 527
    701 460 598
    65 389 1074
    363 127 704
    594 42 1022
    679 681 441
    626 265 255
    237 108 345
    608 422 118
    162 196 257
    150 704 951
    4 368 126
    193 175 409
    531 799 875
    224 521 60
    223 635 7
    703 743 820
    689 571 575
    328 674 162
    410 575 336
    582 303 681
    423 464 1066
    856 645 854
    39 702 48
    90 49 181
    836 551 460
    404 190 163
    71 386 871
    256 486 853
    870 713 130
    785 677 1100
    413 147 212
    220 8 648
    315 462 129
    595 106 36
    177 107 849
    120 520 208
    366 817 1099
    669 438 995
    880 403 1002
    233 88 720
    159 674 1095
    469 229 1040
    76 589 557
    893 246 755
    860 685 98
    41 716 164
    543 810 810
    30 750 188
    126 717 334
    121 632 942
    787 92 972
    605 612 864
    615 635 898
    859 526 816
    505 496 1039
    895 538 339
    640 794 518
    817 389 542
    197 56 1085
    677 739 242
    837 745 41
    293 813 558
    330 832 178
    305 810 170
    128 66 123
    667 559 662
    426 516 828
    571 335 887
    373 473 908
    73 96 343
    45 220 0
    476 738 910
    728 1 925
    574 60 618
    590 93 672
    225 500 303
    876 498 119
    125 530 609
    127 352 463
    870 448 837
    629 29 362
    164 138 468
    807 639 763
    617 136 735
    541 706 1067
    379 266 272
    292 752 624
    286 460 804
    557 365 125
    345 149 50
    80 230 986
    816 184 663
    272 271 157
    59 99 958
    95 168 17
    539 887 612
    122 617 66
    756 68 260
    408 362 495
    40 775 117
    288 73 191
    860 433 477
    797 188 980
    378 611 519
    895 465 261
    712 250 454
    304 361 496
    486 556 259
    827 492 289
    254 220 541
    39 560 813
    653 706 996
    173 558 802
    352 532 809
    387 185 358
    711 461 943
    392 702 601
    572 81 368
    229 390 1090
    556 837 487
    281 598 74
    158 195 798
    270 52 708
    298 858 402
    671 583 100
    562 46 355
    580 621 508
    247 12 954
    889 421 494
    148 184 295
    494 560 224
    127 863 1013
    108 729 1110
    249 732 222
    114 564 695
    70 157 503
    611 864 391
    241 97 184
    833 424 194
    48 535 438
    780 626 716
    586 56 323
    876 11 15
    622 288 988
    134 403 62
    396 763 67
    740 308 215
    367 475 249
    77 443 306
    134 256 420
    565 772 825
    608 412 32
    892 811 77
    161 299 1052
    279 354 843
    76 492 97
    676 315 1101
    627 805 282
    504 43 960
    361 225 134
    686 469 313
    51 20 832
    634 442 933
    195 266 1021
    677 557 617
    142 413 909
    242 452 866
    453 874 700
    511 878 684
    103 602 141
    723 714 40
    600 718 1073
    485 313 870
    463 566 632
    107 655 613
    705 358 148
    709 390 903
    209 575 890
    375 123 660
    364 474 243
    193 879 596
    89 488 758
    165 540 636
    100 544 649
    488 466 771
    79 714 983
    692 593 514
    385 293 28
    371 521 847
    159 490 203
    432 338 271
    534 639 165
    570 420 59
    73 677 246
    483 311 235
    760 78 586
    212 190 812
    737 118 139
    653 752 1007
    873 779 176
    539 386 521
    14 331 341
    546 452 651
    537 502 1071
    854 262 1102
    612 404 78
    833 221 145
    234 27 534
    154 377 761
    633 140 388
    623 76 732
    420 216 406
    375 430 907
    232 661 82
    775 459 550
    602 660 38
    49 778 738
    268 656 1072
    185 836 938
    745 245 401
    274 657 404
    549 350 734
    664 392 844
    783 744 24
    682 587 1055
    252 560 863
    818 300 760
    314 592 458
    14 421 462
    396 101 318
    58 575 561
    803 480 706
    778 273 283
    683 231 179
    173 669 104
    50 562 253
    301 609 214
    47 497 45
    811 886 538
    798 505 857
    790 565 326
    651 597 1083
    663 5 507
    311 291 999
    271 353 142
    227 37 702
    281 451 900
    339 681 27
    509 769 437
    260 645 54
    733 432 892
    874 450 1024
    662 439 946
    240 212 599
    464 581 512
    779 67 524
    211 660 275
    170 56 205
    481 766 30
    871 503 600
    68 677 390
    800 724 637
    892 629 783
    615 310 443
    742 687 363
    838 414 728
    90 789 72
    606 701 1107
    117 435 808
    194 697 767
    115 542 656
    608 280 397
    306 206 448
    239 832 233
    69 169 25
    32 444 365
    668 186 169
    257 375 841
    114 715 719
    593 579 948
    704 514 144
    693 58 680
    374 756 101
    771 782 359
    46 174 821
    126 454 522
    170 720 779
    748 150 1015
    506 846 531
    189 614 22
    206 109 587
    377 132 690
    885 217 1079
    276 381 211
    412 336 395
    397 513 26
    24 135 110
    557 151 484
    828 59 280
    64 301 544
    348 493 905
    717 794 1084
    218 128 646
    713 407 630
    778 336 977
    852 648 116
    473 369 76
    855 110 554
    641 149 52
    265 819 370
    38 51 71
    243 515 276
    723 177 161
    610 235 389
    801 446 228
    658 786 683
    273 42 533
    507 455 1064
    379 67 959
    604 57 927
    177 276 85
    26 748 1026
    508 387 687
    535 527 605
    354 174 641
    759 899 590
    222 152 834
    573 519 51
    156 414 1106
    848 737 416
    11 382 382
    65 645 444
    644 277 440
    688 802 572
    881 133 490
    201 514 530
    559 640 10
    572 696 423
    112 623 92
    178 873 859
    447 712 724
    191 362 505
    459 778 371
    472 462 13
    85 634 715
    496 618 931
    700 335 686
    101 365 884
    109 378 1097
    35 888 880
    441 690 560
    58 537 201
    56 332 115
    811 504 982
    588 783 976
    879 835 633
    507 163 1016
    112 764 442
    786 79 563
    768 181 190
    560 869 934
    541 426 971
    892 334 1057
    244 349 383
    289 331 274
    32 446 897
    407 312 245
    690 427 210
    555 191 607
    238 376 357
    399 16 128
    535 275 488
    671 730 762
    45 851 146
    276 781 688
    171 690 1068
    138 655 667
    81 344 344
    575 406 377
    21 685 346
    666 878 1000
    741 618 167
    494 240 21
    292 221 305
    501 898 330
    642 94 251
    136 498 349
    785 176 937
    467 707 623
    372 668 532
    281 385 91
    697 620 559
    747 482 497
    31 707 697
    767 424 321
    22 347 759
    495 538 213
    518 42 1008
    647 774 232
    579 667 256
    261 442 1076
    135 428 429
    553 244 151
    157 290 674
    279 283 593
    691 900 1103
    183 322 805
    172 98 780
    708 873 692
    897 426 682
    317 129 320
    52 636 198
    402 324 591
    153 237 868
    720 187 266
    369 30 886
    800 328 55
    599 858 945
    87 808 366
    622 319 698
    202 370 350
    620 889 287
    652 240 105
    474 258 177
    417 327 481
    662 516 455
    439 820 873
    484 123 801
    754 686 1043
    388 655 766
    543 721 381
    839 834 713
    568 823 923
    318 62 285
    586 247 473
    680 344 93
    722 250 790
    341 805 556
    487 584 500
    476 772 317
    523 183 152
    169 308 199
    151 835 107
    400 17 928
    492 396 769
    104 607 525
    391 847 645
    189 736 307
    201 343 342
    634 386 58
    705 650 219
    850 159 585
    23 561 425
    224 528 103
    676 663 957
    449 347 787
    875 416 629
    839 7 11
    351 860 896
    585 747 553
    763 93 726
    853 81 689
    137 126 997
    147 623 913
    207 710 885
    79 440 748
    323 89 262
    269 458 360
    481 61 658
    749 879 1044
    761 348 298
    77 219 407
    561 871 14
    53 583 922
    585 480 915
    411 325 768
    118 866 536
    43 687 998
    319 629 961
    307 461 643
    392 561 856
    664 740 693
    360 596 990
    679 524 966
    292 887 569
    625 757 375
    807 337 241
    200 806 12
    431 581 2
    759 401 731
    592 469 919
    732 444 540
    170 503 1061
    333 145 338
    560 162 411
    212 269 138
    891 797 288
    657 404 987
    689 654 173
    503 128 1006
    411 285 108
    143 232 626
    828 826 1028
    253 337 131
    656 380 356
    18 305 552
    36 898 765
    105 289 480
    572 175 661
    622 433 193
    22 250 981
    896 143 196
    324 446 749
    278 445 1051
    525 186 114
    122 410 461
    541 363 329
    684 57 920
    637 801 545
    61 470 86
    823 398 124
    765 19 615
    582 665 292
    631 880 322
    548 601 717
    612 149 174
    775 750 284
    840 673 220
    540 102 154
    771 19 1078
    622 70 611
    648 177 237
    882 708 867
    429 899 565
    366 644 851
    277 397 806
    482 607 666
    119 172 472
    709 110 1087
    330 838 657
    817 447 539
    34 718 302
    130 769 102
    588 167 784
    896 443 204
    54 779 414
    364 60 410
    201 458 879
    751 113 226
    267 770 721
    77 486 430
    77 117 744
    385 450 889
    839 628 1003
    213 760 736
    10 624 1094
    666 790 433
    62 898 718
    395 798 647
    227 409 301
    160 781 634
    31 92 635
    44 15 8
    746 503 711
    815 9 743
    197 798 989
    398 791 701
    401 338 340
    405 287 614
    275 274 399
    739 272 43
    361 247 1063
    847 816 792
    152 334 894
    682 446 431
    687 191 23
    181 101 899
    142 883 811
    575 521 1027
    865 151 819
    833 73 577
    306 670 973
    624 119 852
    434 105 87
    753 597 400
    82 89 671
    130 258 594
    698 790 1080
    425 716 304
    90 735 267
    848 890 775
    632 53 795
    894 208 234
    210 654 953
    792 537 785
    494 273 526
    92 595 1070
    328 5 378
    102 657 293
    339 23 705
    160 867 668
    315 488 513
    416 394 476
    709 418 1093
    19 817 465
    830 233 529
    72 891 797
    632 568 373
    630 219 571
    844 470 1088
    603 741 822
    869 770 902
    93 888 1105
    498 189 911
    828 15 185
    64 466 53
    275 437 579
    16 176 264
    10 462 878
    111 434 1077
    33 822 310
    449 329 921
    445 768 535
    148 169 80
    595 598 968
    818 282 5
    105 736 1046
    877 717 818
    20 215 314
    683 522 1108
    255 410 369
    394 567 137
    283 719 602
    826 418 244
    210 547 673
    527 722 172
    520 433 823
    302 546 122
    373 341 670
    546 731 833
    487 49 127
    167 342 479
    400 881 511
    793 830 1037
    13 739 807
    231 383 1042
    767 533 546
    530 346 677
    675 773 1034
    219 765 831
    566 493 588
    372 587 324
    709 324 337
    793 4 217
    819 223 830
    642 877 835
    577 857 850
    78 463 583
    340 824 372
    900 353 422
    366 212 932
    489 431 273
    376 762 940
    592 131 209
    723 665 862
    206 499 467
    292 44 132
    384 321 380
    115 678 392
    563 208 861
    580 522 446
    115 861 941
    628 192 316
    23 524 57
    692 355 1019
    391 478 678
    394 233 1047
    40 84 361
    180 358 551
    776 38 149
    675 614 418
    237 477 576
    145 309 616
    894 141 1030
    648 201 1104
    323 724 838
    710 752 574
    258 6 112
    641 777 73
    27 834 155
    263 844 740
    407 47 312
    754 350 869
    699 512 56
    113 733 61
    868 465 975
    638 395 638
    331 740 348
    13 733 31
    415 116 622
    27 514 332
    252 886 331
    762 437 427
    827 721 457
    661 48 1005
    131 66 202
    640 717 904
    144 187 895
    266 849 499
    315 843 547
    731 682 644
    467 50 604
    29 162 1009
    636 163 746
    467 601 492
    897 286 956
    681 586 778
    267 475 286
    161 670 248
    55 391 1018
    259 205 691
    18 37 793
    25 284 936
    613 299 153
    483 121 881
    101 494 459
    251 146 876
    187 677 95
    357 842 714
    419 43 1065
    825 110 166
    451 329 620
    368 559 1023
    106 9 216
    643 689 679
    456 374 712
    508 199 764
    726 363 654
    646 280 268
    854 294 573
    711 133 739
    550 872 965
    586 758 478
    624 280 621
    5 558 96
    514 600 120
    501 596 189
    543 37 994
    528 297 270
    886 317 815
    367 627 445
    410 412 826
    787 166 34
    264 738 891
    743 504 279
    214 861 291
    751 349 1048
    51 893 405
    402 121 774
    557 830 901
    875 180 675
    382 12 227
    312 332 1025
    585 290 394
    100 185 1029
    688 55 353
    698 154 70
    571 680 49
    535 567 750
    384 188 848
    531 500 930
    790 613 1012
    48 318 608
    517 862 393
    69 254 319
    741 501 741
    368 83 364
    387 652 426
    211 617 424
    719 735 803
    819 773 1054
    418 508 223
    327 485 952
    605 725 1058
    7 204 1056
    35 2 839
    270 543 814
    28 585 1
    393 479 969
    94 322 113
    569 168 1098
    600 863 158
    822 495 403
    342 604 225
    84 309 707
    74 727 434
    793 244 180
    606 499 727
    388 71 250
    307 550 625
    821 633 493
    720 1 1092
    628 857 221
    578 479 1096
    584 304 1017
    725 97 742
    399 316 984
    619 75 160
    16 69 421
    757 239 386
    843 591 236
    517 321 696
    616 888 325
    799 140 1010
    131 589 703
    862 394 694
    783 298 978
    780 35 398
    867 572 1059
    116 106 1089
    339 294 439
    174 196 918
    352 234 548
    236 782 42
    735 646 502
    619 39 1038
    825 425 799
    260 325 44
    599 268 752
    137 381 150
    357 471 906
    238 457 200
    345 501 384
    529 552 582
    659 777 882
    278 742 747
    825 351 974
    672 570 676
    846 401 935
    233 825 949
    511 518 1031
    452 236 474
    561 182 1081
    796 86 537
    96 478 491
    15 453 79
    621 181 504
    576 320 597
    859 868 230
    692 655 985
    662 4 231
    787 591 182
    290 217 516
    529 649 207
    672 194 709
    812 59 722
    659 420 1091
    821 132 46
    276 886 192
    279 385 277
    510 792 417
    218 34 432
    546 814 187
    374 508 789
    215 203 94
    792 359 296
    438 821 136
    198 196 258
    831 747 278
    608 850 449
    487 750 877
    552 855 1004
    732 105 912
    63 484 464
    829 432 99
    371 489 829
    804 861 9
    285 395 772
    555 2 753
    598 267 855
    349 532 309
    329 313 733
    302 673 917
    776 129 294
    255 436 175
    344 264 89
    262 430 140
    840 542 756
    307 110 845
    74 409 568
    41 303 308
    609 195 699
    553 259 1011
    313 487 450
    224 114 874
    694 239 367
    257 103 415
    828 70 939
    280 637 1045
    309 796 297
    884 347 858
    187 528 475
    699 755 967
    583 795 171
    789 243 872
    296 708 631
    791 356 485
    803 72 664
    222 522 347
    295 876 470
    782 248 991
    429 268 379
    715 766 197
    95 458 723
    841 789 413
    812 175 37
    269 393 247
    468 45 685
    883 860 238
    330 333 883
    512 643 299
    548 86 603
    436 461 121
    245 213 408
    569 284 515
    534 523 665
    98 809 745
    695 824 610
    85 423 581
    87 681 218
    308 510 65
    179 707 35
    713 415 452
    200 125 254
    346 326 842
    210 258 88
    236 380 549
    845 314 782
    547 156 16
    104 447 564
    551 511 650
    849 729 90
    216 518 396
    734 536 471
    47 36 327
    102 746 1109
    617 870 195
    346 158 489
    390 716 652
    771 473 642
    145 51 374
    296 832 269
    373 155 453
    714 871 796
    167 17 1036
    678 829 567
    428 153 501
    85 859 469
    143 536 68
    98 509 595
    610 616 914
    232 545 351
    843 599 39
    377 67 300
    241 700 570
    122 185 156
    466 580 1001
    323 137 606
    454 863 520
    655 774 428
    430 763 619
    310 7 1049
    383 755 751
    605 648 970
    647 261 1041
    182 565 962
    825 314 860
    249 178 33
    744 613 328
    845 683 290
    147 621 944
    256 118 482
    587 464 18
    693 863 135
    477 734 929
    604 200 1014
    781 3 447
    437 88 950
    758 197 979
    831 286 1032
    370 477 81
    848 96 1033
    188 203 354
    712 872 29
    355 449 498
    771 124 143
    696 204 893
    318 597 436
    384 730 993
    235 6 106
    806 629 1082
    214 691 206
    852 199 263
    577 84 335
    764 343 729
    468 549 964
    263 762 69
    801 685 510
    532 864 352
    757 554 781
    63 422 466
    573 722 589
    897 727 111
    9 283 435
    85 758 628
    873 483 1086
    457 226 183
    252 319 412
    230 441 315
    574 749 6
    297 855 1053
    124 3 580
    287 422 239
    831 269 186
    808 434 333
    8 209 786
    623 300 725
    883 491 888
    82 205 710
    519 650 483
    72 539 836
    139 695 84
    842 726 655
    336 649 252
    448 638 947
    788 207 827
    658 491 840
    693 440 1069`,
        `18 23
    5 12 18
    17 2 5
    7 18 3
    17 6 0
    15 12 16
    2 3 8
    14 9 20
    4 9 11
    13 1 21
    13 12 15
    15 12 10
    6 16 9
    11 18 2
    9 16 17
    12 4 4
    7 4 19
    17 1 12
    10 14 7
    8 5 13
    18 3 14
    4 11 6
    15 3 1
    12 5 22`,
        `20 30
    4 11 27
    7 9 14
    13 6 23
    18 10 3
    19 4 19
    2 7 6
    11 13 20
    6 15 0
    14 18 2
    16 5 26
    2 20 10
    16 17 21
    6 2 9
    11 5 25
    20 19 28
    14 4 29
    10 4 24
    9 7 8
    7 1 15
    12 13 7
    8 3 22
    8 13 4
    17 14 1
    8 15 11
    1 10 5
    18 15 18
    7 13 17
    12 9 16
    14 6 12
    9 2 13`,
        `7 10
    4 3 4
    2 5 3
    5 7 8
    5 3 1
    1 2 5
    7 5 6
    7 4 7
    6 2 9
    3 2 0
    7 3 2`,
        `5 6
1 3 5
4 5 0
2 1 3
3 2 1
4 3 4
4 2 2`];
    for (let i = 0; i < 1; i++) {   // inputs.length
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;
        const nm = lines[index++].split(' '), n = parseInt(nm[0], 10), m = parseInt(nm[1], 10);
        let roads = Array(m);
        for (let roadsRowItr = 0; roadsRowItr < m; roadsRowItr++)
            roads[roadsRowItr] = lines[index++].split(' ').map(roadsTemp => parseInt(roadsTemp, 10));


        let result = roadsInHackerland(n, roads);
        console.log(result);
    }
}
