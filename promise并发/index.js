const urls = [
  "https://echo.apifox.com/status/200",
  "https://echo.apifox.com/status/200",
  "https://echo.apifox.com/status/200",
  "https://echo.apifox.com/status/200",
  "https://echo.apifox.com/status/200",
  "https://echo.apifox.com/status/200",
];

const sendRequest = (urls, max = 2) => {
  let allLens = urls.length;
  let res = Array.from(allLens);
  let finishCnt = 0;
  return new Promise((resolve, reject) => {
    while (finishCnt < max) {
      next();
    }
    function next() {
      let current = finishCnt++;
      const url = urls[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());

      if (current >= allLens) {
        resolve(res);
        return;
      }

      fetch(url)
        .then((res) => {
          console.log("res", res);
          res[current] = res;
          console.log(`完成 ${current}`, new Date().toLocaleString());
          if (current < allLens) {
            next();
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString());
          res[current] = err;
          if (current < allLens) {
            next();
          }
        });
    }
  });
};

sendRequest(urls).then((res) => {
  console.log("res", res);
});
