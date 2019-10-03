'use strict'

let isPrimeArr = [];

function sillyGame(n) {
    function sieve_Initialize(upperN) {
        isPrimeArr = [false, false];
        for (let i = 2; i <= upperN; i++)
            isPrimeArr[i] = true;

        for (let i = 2; i <= upperN; i++) {
            if (isPrimeArr[i] === true) {
                let iPower = i * i;
                for (let j = iPower; j <= upperN; j += i)
                    isPrimeArr[j] = false;
            }
        }
    }

    function getPrimeCount(num) {
        let count = 0;
        for (let i = 2; i <= num; i++)
            if (isPrimeArr[i] === true)
                count++;

        return count;
    }

    if (isPrimeArr.length === 0)
        sieve_Initialize(Math.pow(10, 5));

    let primeCount = getPrimeCount(n);
    return (primeCount % 2 === 1) ? 'Alice' : 'Bob';
}

function main() {
    let input = `1000
    92410
    92480
    97927
    98942
    96574
    97208
    90283
    91672
    96639
    90435
    91509
    95280
    92263
    94884
    95951
    92399
    98931
    90364
    90789
    95904
    94863
    91087
    90754
    92609
    97352
    98252
    94022
    99711
    92086
    92768
    90951
    94496
    95247
    92525
    97086
    95469
    99733
    91017
    97141
    90019
    91452
    92297
    95299
    97363
    90829
    94898
    93410
    99760
    95262
    94199
    99312
    90125
    98934
    93714
    96382
    96286
    91965
    90404
    99645
    94051
    93171
    90595
    92195
    92066
    93120
    99281
    97535
    96501
    90298
    98324
    90168
    95397
    90621
    95467
    92760
    91450
    90365
    96169
    94857
    99275
    94016
    94169
    93047
    92949
    97882
    99429
    92883
    93495
    93480
    96175
    97546
    90299
    90418
    99741
    92365
    97186
    92670
    93548
    93687
    96616
    95520
    93854
    92013
    96140
    92969
    98420
    91238
    96981
    98237
    99743
    96256
    95901
    93911
    92951
    98850
    95441
    92379
    95380
    98936
    99507
    91555
    90130
    99806
    91973
    93519
    95819
    99159
    96189
    99367
    96494
    92805
    94887
    93996
    98465
    94675
    90612
    96885
    99560
    97593
    95122
    99303
    97497
    91023
    96862
    90447
    93520
    95951
    96474
    92548
    94887
    95981
    94103
    98665
    99435
    99724
    92184
    95254
    92531
    92021
    98269
    99025
    94825
    96804
    93020
    96938
    95126
    97280
    93823
    98334
    94873
    92593
    97637
    96018
    97264
    98146
    96465
    94432
    94097
    96587
    96980
    92631
    96216
    94731
    91296
    95651
    98103
    93479
    94553
    90634
    95500
    92822
    93306
    93973
    93273
    99974
    94559
    98399
    97254
    92030
    96733
    92127
    98271
    98018
    98145
    95534
    99812
    98257
    93614
    97556
    98492
    94241
    90187
    94707
    92620
    95131
    94006
    90722
    92258
    98558
    91356
    97757
    95028
    94662
    95378
    98301
    94636
    99936
    90348
    91890
    95614
    90729
    97665
    93884
    92394
    99457
    99418
    92206
    91362
    96680
    99762
    99854
    90921
    93597
    98209
    93540
    98727
    92214
    97910
    90985
    90772
    99266
    92390
    95800
    97575
    91415
    97748
    95859
    94999
    98096
    91396
    90613
    98824
    99061
    94497
    94866
    92166
    97563
    97072
    93528
    94242
    90481
    97029
    98811
    97726
    95238
    95999
    90101
    91100
    93909
    94733
    91872
    96822
    97123
    91319
    98045
    92186
    99067
    93904
    97185
    90811
    98948
    91445
    93283
    91656
    95942
    98149
    93822
    97152
    95220
    90997
    95042
    99349
    98026
    93853
    90723
    96912
    93499
    90823
    98011
    97408
    95556
    93531
    94230
    96327
    94850
    92275
    98512
    97565
    99826
    99345
    98375
    98774
    90790
    91658
    90430
    90379
    99806
    97899
    97531
    98674
    98896
    92573
    91671
    90570
    90074
    92394
    97482
    93573
    93217
    95493
    94628
    98773
    99023
    98858
    95099
    97521
    94780
    97259
    95085
    98254
    96604
    93460
    90676
    91041
    95118
    94753
    91420
    98572
    92652
    92599
    97246
    91548
    98820
    98917
    92118
    98894
    91310
    93248
    96114
    94527
    98740
    90742
    96947
    91411
    93248
    92046
    98932
    91676
    92953
    94017
    93578
    99557
    91125
    94253
    90598
    99890
    99006
    95666
    98462
    91658
    98265
    95707
    96854
    97085
    98272
    98972
    99626
    99582
    92220
    99388
    97756
    94608
    90130
    94703
    96019
    97026
    90397
    98598
    98701
    93350
    96263
    92279
    96555
    97387
    90180
    97152
    97277
    99186
    92818
    95739
    94492
    94730
    95094
    91346
    91815
    93365
    93966
    95089
    96595
    99833
    94477
    94351
    94441
    98255
    92702
    94107
    95280
    96747
    96353
    97629
    93745
    92616
    93556
    90299
    93651
    93735
    91099
    90928
    92921
    93917
    90314
    97412
    92295
    95408
    92406
    94109
    98773
    96371
    92846
    95367
    96204
    97322
    93366
    94293
    99225
    99715
    92048
    94505
    96462
    92049
    92134
    90206
    94664
    95689
    90505
    98315
    99424
    95252
    92890
    95993
    99169
    93204
    97053
    91463
    98612
    99458
    99220
    91032
    99477
    95714
    90047
    99329
    93036
    93413
    97270
    95908
    96776
    99317
    90413
    93237
    91366
    96194
    97091
    99678
    91883
    91244
    91640
    94955
    96496
    94530
    94596
    99313
    97734
    95296
    94424
    99994
    98402
    93644
    91026
    97879
    93005
    91073
    90856
    99689
    98133
    98126
    95597
    94909
    91091
    96009
    91794
    96104
    92203
    98885
    95782
    97734
    93777
    91070
    96337
    90273
    95600
    90933
    99585
    93334
    99877
    94009
    93327
    98279
    91300
    98001
    96158
    94305
    99073
    90662
    93994
    90854
    98787
    99590
    99411
    99878
    99247
    91204
    95982
    95098
    93737
    95411
    92832
    91161
    96481
    92817
    91434
    92080
    93750
    94667
    99062
    97274
    92323
    96037
    95553
    93623
    94037
    95358
    91576
    96758
    96020
    99218
    97612
    94807
    92456
    90671
    98332
    91703
    95523
    97962
    96801
    92907
    97021
    93281
    94068
    93501
    96098
    95502
    99229
    93495
    93816
    91939
    90769
    96139
    91623
    96322
    99762
    95660
    95328
    94986
    96066
    91347
    94204
    97326
    99802
    90307
    97997
    91782
    95658
    93519
    99743
    92458
    96426
    96764
    99387
    90494
    93913
    95484
    99644
    96790
    92627
    93460
    98728
    97044
    99599
    90351
    97014
    93009
    99659
    92341
    91643
    95725
    97336
    99494
    93051
    97138
    99801
    91048
    98919
    95459
    98215
    92310
    91565
    94641
    99074
    90951
    98783
    92986
    90083
    92074
    93424
    96358
    95534
    92152
    93402
    98780
    96151
    90416
    95437
    95810
    92757
    90727
    91535
    90093
    90221
    98234
    90878
    93670
    99281
    99797
    99129
    91144
    95755
    94341
    95784
    94829
    98940
    98215
    91463
    92671
    90289
    94886
    99029
    99470
    90686
    92431
    91898
    96836
    96495
    90983
    92646
    92899
    91710
    97828
    92992
    91931
    96062
    97518
    95601
    98991
    90963
    98377
    90134
    96718
    92718
    99566
    91546
    91658
    97781
    96657
    94329
    91717
    95191
    97006
    94835
    95876
    93085
    96733
    96360
    99580
    97716
    99006
    92479
    93073
    90482
    99118
    95004
    96543
    96636
    94252
    95534
    97598
    92629
    95668
    94316
    98995
    95234
    99510
    94301
    96662
    99814
    92278
    92027
    95005
    99284
    96862
    94529
    96017
    93595
    90889
    95597
    94959
    93542
    91723
    98032
    94024
    90841
    96683
    90567
    91125
    90935
    99748
    98723
    97212
    99064
    96686
    99855
    94297
    96196
    94156
    94607
    96010
    96434
    96634
    94662
    99366
    93496
    99191
    95383
    90739
    93727
    94628
    99346
    97269
    96351
    91025
    91293
    90840
    91356
    95507
    91964
    95939
    95255
    90687
    93151
    94319
    97373
    93006
    92264
    97216
    90810
    90519
    96874
    97244
    97153
    91536
    90258
    94297
    94374
    95641
    98684
    98101
    90269
    98029
    95370
    90267
    92702
    90311
    91107
    94058
    95818
    93071
    99997
    94721
    97405
    96796
    92687
    94778
    99802
    98599
    95642
    94260
    99117
    92515
    95152
    99918
    94051
    95410
    97862
    98425
    94699
    96546
    90174
    98616
    98223
    95544
    98883
    90925
    99502
    99989
    98631
    95320
    96708
    98628
    93688
    94113
    95424
    96375
    92538
    98874
    98622
    98180
    96782
    97739
    90695
    91934
    91304
    94745
    97344
    99166
    96818
    95691
    95712
    96991
    94306
    97582
    96183
    93189
    92155
    99333
    96826
    90785
    98300
    97181
    93061
    91988
    91294
    98484
    92011
    97480
    91006
    90633
    95659
    91435
    92019
    96354
    93369
    93323
    94747
    94360
    92489
    95212
    90051
    91849
    95851
    94357
    99431
    95682
    91193
    95233
    95014
    91667
    96018
    93314
    98848
    99079
    95302
    93789
    91211
    90961
    91269
    95864
    91594
    96928
    97299
    93613
    96929
    90668
    90584
    95324
    95028
    96721
    90536
    95078
    92217
    96387
    93083
    95296
    92068
    94276
    90529
    90730
    99590
    96547
    94044
    98438
    95625
    92994
    95875
    96836
    93955
    97143
    96348
    99197
    97719
    93647
    96457
    94648
    97962
    97041
    99971
    92990
    93761
    94155
    91716
    95978
    94189
    98446
    91274
    99905
    92722
    91802
    90635
    92312
    91997
    94679
    94397
    97622
    91321
    90272
    98105
    95276
    91063
    98101
    94473
    98781`, lines = input.split('\n').map(s => s.trim()).filter(s => s !== ''), index = 0;

    const g = parseInt(lines[index++], 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(lines[index++], 10);
        let result = sillyGame(n);
        console.log(result + "\n");
    }
}

countTime(main)();

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