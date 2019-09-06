let month= [];

function updateLeapYear(year) {
    if(year % 400 == 0) {
        month[2] = 28;
    } else if(year % 100 == 0) {
        month[2] = 29;
    } else if(year % 4 == 0) {
        month[2] = 29;
    } else {
        month[2] = 28;
    }
}

function storeMonth() {
    month[1] = 31;
    month[2] = 28;
    month[3] = 31;
    month[4] = 30;
    month[5] = 31;
    month[6] = 30;
    month[7] = 31;
    month[8] = 31;
    month[9] = 30;
    month[10] = 31;
    month[11] = 30;
    month[12] = 31;
}

function findLuckyDates( d1,  m1,  y1,  d2,  m2,  y2) {
    storeMonth();

    let result = 0;

    while(true) {
        let x = d1;
        x = x * 100 + m1;
        x = x * 10000 + y1;
        if(x % 4 == 0 || x % 7 == 0) {
            result = result + 1;
        }
        if(d1 == d2 && m1 == m2 && y1 == y2) {
            break;
        }
        updateLeapYear(y1);
        d1 = d1 + 1;
        if(d1 > month[m1]) {
            m1 = m1 + 1;
            d1 = 1;
            if(m1 > 12) {
                y1 =  y1 + 1;
                m1 = m1 + 1;
            }
        }
    }
    return result;
}

console.log(findLuckyDates(02,08,2025,04,09,2025));     // expects 5
console.log(findLuckyDates(25,06,2365, 07,09,8847));  