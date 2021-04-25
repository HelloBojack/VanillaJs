function paresQuery() {
  let href = location.href;
  let queryArr = href.slice(href.indexOf('?') + 1).split('&')
  let result = {}
  queryArr.map(n => {
    result[n.split('=')[0]] = n.split('=')[1]
  })
  return result
}
console.log(paresQuery())