'use strict'

main();

// Do not use bit operation like right/left shift
function whatsNext(bigIntArr) {
    function getArray(bigIntArr) {
        let arrLength = bigIntArr.length;
        if (arrLength.length === 1) {   // means binary format of the number is all 1s
            let oneCount = bigIntArr[0], resultArr = [1n, 1n];
            if (oneCount > 1n)
                resultArr.push(oneCount - 1n);
            return resultArr;
        }
        else if (arrLength % 2 === 0) { // like [111 0000 1111 0000]
            let resultArr = bigIntArr.slice();
            if (arrLength === 2) {
                resultArr[0]--;
                resultArr.unshift(1n);
                resultArr.unshift(1n);
            }
            else {
                resultArr[arrLength - 3]--;     // a [zeor] of 0s will become 1, therefore decrement its zero count value
                resultArr[arrLength - 2]--;      // a [one] of 1s will become 0, therefore decrement its one count value
                resultArr.splice(arrLength - 2, 0, 1n, 1n);
            }

            arrLength = resultArr.length;
            // now resultArr[arrLength - 2] is all 1s, resultArr[arrLength - 1] is all 0s, move as many 1s to os as possible
            resultArr[arrLength - 3] += resultArr[arrLength - 1];
            resultArr.pop();

            while (resultArr[resultArr.length - 1] === 0n)
                resultArr.pop();

            // deal with special case like 0 is left in the array
            for (let i = resultArr.length - 1; i >= 1; i--) {
                if (resultArr[i] === 0n) {
                    resultArr[i - 1] += resultArr[i + 1];
                    resultArr.splice(i, 2);
                    break;
                }
            }

            return resultArr;
        }
        else {// like [111 0000 1111]
            let resultArr = bigIntArr.slice(), arrLength = resultArr.length;
            let zeroCount = resultArr[arrLength - 2], oneCout = resultArr[arrLength - 1];
            if (zeroCount === 1n) {
                resultArr[arrLength - 3]++;
            }
            else {
                resultArr[arrLength - 2]--;
                resultArr.splice(arrLength - 1, 0, 1n, 1n);
            }
            arrLength = resultArr.length;
            resultArr[arrLength - 1]--;
            if (resultArr[arrLength - 1] === 0n)
                resultArr.pop();

            return resultArr;
        }
    }

    let bitsArray = getArray(bigIntArr);
    console.log(bitsArray.length);
    console.log(bitsArray.join(' '));
}

function main() {
    let inputs = [`90
    8
    6002 7953 8450 9382 2578 3804 1 3633
    2
    8017 7282
    7
    1873 5985 3105 1 5537 7602 3265
    6
    8417 4257 5626 1 1 2113
    2
    7569 1777
    1
    3217
    4
    5153 897 5958 4177
    2
    1610 1
    7
    3473 8769 626 3377 8042 7473 2180
    5
    9042 2737 2522 4310 4194
    7
    1522 722 8104 3809 3105 657 3537
    1
    3442
    5
    8482 177 2129 626 2417
    2
    8642 2225
    10
    50 7170 1362 6210 7462 6049 449 2673 8400 1
    3
    5626 1953 3126
    4
    8842 1 8769 1
    1
    1876
    5
    626 8126 3600 8170 1
    5
    6625 130 8210 1 2129
    2
    6497 1442
    2
    8482 8737
    10
    6032 4162 3873 5626 2257 1370 7617 4977 1 4314
    7
    8577 8769 9810 1 3873 385 5345
    7
    4225 1252 913 5282 3889 273 3682
    2
    9842 6002
    9
    4177 9376 8514 7297 626 497 5442 1 625
    7
    1 9324 1 2257 1788 5614 1
    9
    1876 9745 2322 4122 8126 865 1876 897 3762
    7
    1745 1 6977 6625 8602 4402 626
    7
    1985 5905 8497 4737 817 8737 5626
    7
    9537 4732 626 7185 4305 5377 7617
    5
    8250 626 322 6370 6065
    5
    626 9164 4737 1 9292
    9
    2113 5626 1 3985 3690 2 626 4402 1602
    1
    7697
    2
    9250 97
    4
    1 7297 5718 1
    7
    1 2033 8465 9297 1 2240 9762
    7
    6417 626 9790 4017 2162 1 6177
    9
    8177 1 5922 3825 3217 5280 9312 529 8177
    2
    3402 626
    7
    1330 2322 6977 9329 3985 5377 7377
    8
    9004 1 6082 6033 6870 3770 7393 626
    8
    6322 4834 7777 4202 1 977 3282 1
    2
    6512 2002
    7
    1968 3974 82 4145 1 6577 8642
    6
    524 7408 7009 3457 8929 2504
    7
    1 1 722 6529 1537 337 6450
    7
    4808 9585 1970 6977 1274 5626 6440
    2
    1 4833
    7
    8654 8122 1 3126 1 408 1169
    4
    5153 9249 2850 8162
    2
    1777 8225
    7
    945 4882 1489 9873 5713 2850 724
    2
    1682 2065
    8
    3842 9122 3873 4657 8808 5905 394 1809
    5
    4353 5402 1 962 6705
    6
    3377 7888 5617 2065 1937 1400
    9
    4177 5857 5720 1650 5044 7522 4657 626 8529
    10
    626 8126 1 8828 625 9857 5025 5568 3585 6162
    6
    5410 626 9738 8002 4545 6402
    4
    1 1 9585 8482
    7
    626 6842 2308 1290 1 1 626
    7
    2 865 4288 8225 2928 6097 5626
    1
    7377
    2
    1442 626
    2
    1 3569
    4
    82 2577 1825 3352
    9
    8737 3682 1 1073 1 7905 7762 8322 3202
    2
    8993 6833
    6
    1682 626 1537 922 242 6737
    5
    8908 402 1 9508 626
    3
    322 5202 2657
    5
    8930 626 9473 3969 6144
    7
    5857 7882 5617 4977 1 6033 7825
    2
    8126 1
    1
    3713
    6
    4418 6010 8126 3842 808 6850
    10
    7297 4750 8810 1130 7665 5425 6177 7217 3505 3265
    6
    7602 3352 650 626 3202 372
    2
    3126 7777
    6
    1876 4064 3265 8977 7370 8126
    6
    4376 5185 3617 8833 7122 5626
    3
    1 626 6225
    1
    7278
    1
    3442
    3
    2577 534 7690
    2
    2712 1
    5
    9825 2433 1 1 337`,

        `90
    5
    4737 6002 2242 737 8817
    3
    6385 5626 5745
    7
    1537 626 1 4458 9425 802 2500
    6
    9304 9002 1 6129 6225 1825
    6
    7057 4305 8308 3937 2225 162
    6
    1 9857 3569 6225 7042 1
    3
    1930 2 3126
    6
    1 3713 1 5394 5777 3169
    7
    1922 2858 8369 1 3570 2225 626
    10
    7322 1969 1 7762 5850 9425 2977 2418 5974 2977
    7
    3425 1122 6822 5057 7377 5758 9042
    2
    225 7857
    7
    432 3250 8482 8710 865 6002 442
    7
    1 7185 4450 2930 9377 8402 7697
    7
    3953 1 3777 4145 2337 5626 9105
    3
    3825 5388 177
    9
    4833 70 1 7842 7825 5440 170 2817 940
    1
    8802
    2
    7777 2753
    7
    4305 1 9377 7073 7358 1 2002
    10
    626 1700 9537 6422 6657 8465 7928 9745 1 5274
    5
    9377 9442 4833 5329 1
    2
    626 626
    10
    4210 6710 5260 1690 5633 4177 8577 7810 8482 2850
    8
    4002 9185 8450 8126 1 9862 5345 1
    7
    1 9042 1876 7857 5626 5050 9665
    2
    9505 9617
    1
    2817
    5
    626 7802 1 6385 1980
    8
    1 626 4625 8304 7088 3490 7194 3540
    7
    5233 6644 9345 4058 5297 7980 3524
    5
    3212 626 1 1649 50
    9
    1 6402 225 1505 5665 1 6802 3009 9162
    7
    177 1444 4580 626 3025 1 6738
    7
    9345 4376 9050 9377 2625 802 3602
    1
    626
    7
    626 1094 5233 626 6497 3377 530
    5
    4257 3457 9376 1504 2158
    6
    1217 1 3073 650 1697 1
    2
    1057 8465
    9
    6210 8002 3558 7390 9762 626 8097 1 5522
    5
    1 7130 9377 626 3894
    7
    9150 7617 1 497 8410 626 1388
    5
    3282 2977 1985 6278 6802
    8
    444 1 1873 6769 65 4002 442 7137
    2
    626 6673
    7
    9665 5626 1377 1722 6584 4702 193
    7
    4130 1 4542 8162 4417 1 6625
    10
    6977 1 1 1480 1 5668 5362 5626 5172 1649
    5
    1018 1377 5217 2650 6737
    5
    9824 7882 1052 3126 9376
    2
    6250 4625
    5
    5297 2609 7857 9313 1400
    1
    1
    7
    5169 7137 1 3642 1 1402 3302
    2
    2174 5802
    9
    3126 1842 5626 6002 337 1 508 6769 5377
    9
    1 8385 5857 4376 2497 2412 1 8977 4017
    2
    1 4298
    6
    7582 4562 7713 4162 6657 3617
    7
    1682 6177 6650 8065 6282 3729 9376
    2
    1838 9376
    2
    2097 7934
    9
    8785 9457 2882 8938 8126 1777 3282 6337 928
    2
    2362 4817
    10
    1 8730 3425 977 5360 4998 7057 8977 2097 8817
    6
    6689 5697 82 2433 593 6113
    5
    1 5626 2577 1665 1876
    7
    5457 9376 388 9377 977 6690 4322
    2
    2033 4689
    2
    9002 3762
    4
    1 6577 1 1658
    5
    2770 6833 9137 8122 9457
    7
    1 4209 7233 5626 817 3762 7602
    7
    250 1 6337 9377 4258 3329 6529
    7
    1 7238 5490 1 2082 8657 1602
    1
    5185
    3
    194 4369 4202
    5
    4705 1 1 9282 8050
    10
    5626 2625 1329 4534 1 7953 9682 6113 1682 3377
    8
    7202 1042 8849 7217 9377 9809 1500 7118
    4
    3377 4376 8145 7313
    10
    7057 9377 5626 8065 4913 1 1 9202 5500 1
    4
    1 1377 7617 1
    2
    449 1297
    10
    2702 3312 3057 200 7492 449 5105 2225 5362 900
    5
    6769 3905 1 4993 8497
    7
    6876 2177 5409 450 1 9233 1265
    10
    577 4042 9578 5425 2177 4177 4162 4577 1009 8800
    6
    2177 626 2450 1700 242 1`];

    for (let i = 0; i < 1; i++) {
        let input = inputs[i], lines = input.split('\n').map(s => s.trim()), index = 0;;

        const t = parseInt(lines[index++], 10);
        for (let tItr = 0; tItr < t; tItr++) {
            const arrCount = parseInt(lines[index++], 10), arr = lines[index++].split(' ').map(arrTemp => BigInt(arrTemp));

            whatsNext(arr);
        }
    }
}