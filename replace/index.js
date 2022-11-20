var str = "hello{total}";
var obj = { total: "world" };

str = str.replace(/{(\w*)}/g, function (_, s) {
  return obj[s];
});

console.log(str);
// rep(str, obj);
