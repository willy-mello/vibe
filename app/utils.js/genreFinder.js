




let distinctGenres = [...new Set(flattened)]
// creates a unique universe of genres

for (let i = 0; i < distinctGenres.length; i++) {
  let n = 0
  for (let j = 0; j < flattened.length; j++) {
    if (flattened[j] === distinctGenres[i]) { n++ }
  }
  dic[distinctGenres[i]] = n
}
