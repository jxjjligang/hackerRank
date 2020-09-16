"use strict";

/**
 * This function works because it uses greedy algothrim (get the best result by ensure every step gets the best result)
 */

// Complete the reverseShuffleMerge function below.
function reverseShuffleMerge(s) {
  // map is of char -> Array of char index
  function addToMap(map, char, idx) {
    let arr = map.has(char) ? map.get(char) : [];
    arr.push(idx);
    map.set(char, arr);
  }

  function decrementCount(char2Count, char) {
    let count = char2Count.get(char);
    if (count === 1) {
      char2Count.delete(char);
    } else {
      char2Count.set(char, count - 1);
    }
  }

  function foundEligible(sortedChars, char2IdxArr, char2Count, lastFoundIdx) {
    function isEligible(idx, char2IdxArr, char2Count) {
      for (let char of char2Count.keys()) {
        if (
          char2IdxArr.get(char).filter((v) => v >= idx).length <
          char2Count.get(char)
        ) {
          return false;
        }
      }

      return true;
    }

    for (let char of sortedChars) {
      if (!char2Count.has(char)) {
        continue;
      }

      let idxArr = char2IdxArr.get(char);
      for (let idx of idxArr) {
        if (idx <= lastFoundIdx) {
          continue;
        }

        let eligible = isEligible(idx, char2IdxArr, char2Count);
        if (eligible === true) {
          return [char, idx];
        } else {
          // there is no need to continue to run isEligible, since they won't be elibible any more
          break;
        }
      }
    }

    throw new Error("It should not go there.");
  }

  let char2IdxArr = new Map();
  let reversedS = s.split("").reverse();
  for (let i = 0; i < reversedS.length; i++) {
    addToMap(char2IdxArr, reversedS[i], i);
  }

  let char2Count = new Map(); // char and its count in the original A
  for (let c of char2IdxArr.keys()) {
    char2Count.set(c, char2IdxArr.get(c).length / 2);
  }

  let found = [],
    lastFoundIdx = -1,
    sortedChars = Array.from(char2Count.keys()).sort();
  while (found.length < s.length / 2) {
    let charAndIdx = foundEligible(
      sortedChars,
      char2IdxArr,
      char2Count,
      lastFoundIdx
    );
    found.push(charAndIdx[0]);
    lastFoundIdx = charAndIdx[1];
    decrementCount(char2Count, charAndIdx[0]);
  }

  return found.join("");
}

main();

function main() {
  let inputs = [
    // `abcdefgabcdefg`, `aeiouuoiea`, `eggegg`, 'jjcddjggcdjd',
    "djjcddjggbiigjhfghehhbgdigjicafgjcehhfgifadihiajgciagicdahcbajjbhifjiaajigdgdfhdiijjgaiejgegbbiigida",
  ];
  // expects     agfedcb,          aeiou,        egg,      cgddjj

  for (let i = 0; i < 1; i++) {
    // inputs.length
    let input = inputs[i];
    let lines = input
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== ""),
      index = 0;

    const s = lines[index++];
    let result = reverseShuffleMerge(s);
    console.log(result);
  }
}
