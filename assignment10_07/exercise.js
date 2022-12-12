// Quick Question #1

new Set([1, 1, 2, 2, 3, 4]) // Set(1,2,3,4)


// Quick Question #2

[...new Set("referee")].join("") // ref



// Quick Question #3

let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);

/*
[1,2,3] => true
[1,2,3] => false
*/



// hasDuplicate
function hasDuplicate(arr) {
  const s = new Set(arr)
  return s.size !== arr.length
}



// vowelCount
function vowelCount(str) {
  const m = new Map()
  Array.from(str).forEach(c => {
    if (!isVowel(c))
      return

    if (m.has(c)) {
      m.set(c, m.get(c) + 1)
    } else {
      m.set(c, 1)
    }
  })
  return m
}

function isVowel(c) {
  return c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u'
}