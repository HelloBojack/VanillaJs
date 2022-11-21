const cache = new Map();
async function swr(key, fetcher, options) {
  let data = cache.get(key) || { value: null, promise: null, time: null };
  let { refreshInterval } = options;

  let isOut = Date.now() - data.time > refreshInterval;

  if (isOut && !data.promise) {
    data.promise = fetcher(key)
      .then((res) => {
        data.value = res;
        data.time = Date.now();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        data.promise = null;
      });
  }

  if (data.promise && !data.value) await data.promise;
  cache.set(key, data);
  return { data: data.value };
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const url = "https://echo.apifox.com/get?q1=v1&q2=v2";

document.querySelector("#btn").addEventListener("click", async () => {
  const { data } = await swr(url, fetcher, { refreshInterval: 3000 });
  console.log(data);
  document.querySelector("#text").textContent = JSON.stringify(data);
});
