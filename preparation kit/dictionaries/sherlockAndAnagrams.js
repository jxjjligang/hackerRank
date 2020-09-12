
// Complete the sherlockAndAnagrams function below.
function sherlockAndAnagrams(s) {
  function addToMap(map, key) {
      if (!map.has(key)) {
          map.set(key, 1);
      }
      else {
          map.set(key, 1+ map.get(key));
      }
  }

  function getSignature(i, j) {
      // character to its frequency in s
      let map = new Map();        
      for(let idx = i; idx < j; idx++) {
          let c = s[idx];
          addToMap(map, c);
      }

      let sig = '';
      for(let c of Array.from(map.keys()).sort()) {
          sig = sig + c + ":" + map.get(c) + " ";
      }

      return `[${sig}]`;
  }

  let count = 0;
  const len = s.length;
  let map = new Map();
  for(let i = 0; i< len; i++) {
      for(let j = i + 1; j <= len; j++) {
          let signature = getSignature(i, j);
          addToMap(map, signature);
      }
  }

  for(let key of map.keys()) {
      let n = map.get(key);
      // console.log(`${key}: ${n}`)
      count += ((n) * (n-1)) / 2;
  }

  return count;
}
