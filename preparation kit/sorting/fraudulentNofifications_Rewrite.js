// Gang rewrite on September 12, 2020
// use [Counting Array] to solve the problem
function activityNotifications(expenditure, d) {
  function getMedianValue(countArr, d) {
    // medianCounts: expenditures [amount that reached median], based on that,
    // we can safely decide which (1 or 2) [expenditure value] can be count as [median value(s)]
    let medianCounts = [],
      medianValues = [];
    if (d % 2 === 1) {
      medianCounts[0] = (d + 1) / 2;
    } else {
      medianCounts[0] = d / 2;
      medianCounts[1] = d / 2 + 1;
    }

    let expenditureCount = 0;
    for (let i = 0; i <= 200; i++) {
      if (medianCounts.length === 0) break;

      expenditureCount += countArr[i];
      while (expenditureCount >= medianCounts[0] && medianCounts.length > 0) {
        medianValues.push(i);
        medianCounts.shift();
      }
    }

    return medianValues.reduce((prev, cur) => prev + cur) / medianValues.length;
  }

  function initialiezeCountArr(expenditure, d) {
    let maxValue = expenditure.reduce((prev, cur) => Math.max(prev, cur));
    let countArr = [];
    for (let i = 0; i <= maxValue; i++) {
      countArr[i] = 0;
    }
    for (let i = 0; i < d; i++) {
      countArr[expenditure[i]]++;
    }

    return countArr;
  }

  let countArr = initialiezeCountArr(expenditure, d);
  let count = 0;
  for (let i = d; i < expenditure.length; i++) {
    let median = getMedianValue(countArr, d);
    if (expenditure[i] >= 2 * median) {
      console.log(`${expenditure[i]} >= ${median}`);
      count++;
    }
    countArr[expenditure[i - d]]--;
    countArr[expenditure[i]]++;
  }

  return count;
}
