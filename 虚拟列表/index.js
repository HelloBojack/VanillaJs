const btn = document.querySelector("#button");
const container = document.querySelector("#container");
const total = 10000;
const getData = () => {
  const list = [];
  return new Promise((reslove) => {
    setTimeout(() => {
      for (let i = 0; i < total; i++) {
        list.push(i);
      }
      reslove(list);
    }, 1000);
  });
};

btn.addEventListener("click", async () => {
  const list = await getData();

  // 1. 暴力直接一个一个渲染
  // for (let i in list) {
  //   let li = document.createElement("li");
  //   li.innerText = i;
  //   container.appendChild(li);
  // }

  // 2. setTimeout 分片渲染
  // let pageSize = 20;
  // let pageNumber = 1;
  // function loopRender(currCnt, pageNumber) {
  //   if (currCnt < 0) return;
  //   let pageCnt = Math.min(pageSize, currCnt);
  //   setTimeout(() => {
  //     for (let i = 0; i < pageCnt; i++) {
  //       let li = document.createElement("li");
  //       li.innerText = `${pageNumber}---${i}`;
  //       container.appendChild(li);
  //     }

  //     loopRender(currCnt - pageSize, ++pageNumber);
  //   }, 0);
  // }
  // loopRender(total, pageNumber);

  // 2. requestAnimationFrame 分片渲染
  // let pageSize = 20;
  // let pageNumber = 1;
  // function loopRender(currCnt, pageNumber) {
  //   if (currCnt < 0) return;
  //   let pageCnt = Math.min(pageSize, currCnt);
  //   requestAnimationFrame(() => {
  //     for (let i = 0; i < pageCnt; i++) {
  //       let li = document.createElement("li");
  //       li.innerText = `${pageNumber}---${i}`;
  //       container.appendChild(li);
  //     }

  //     loopRender(currCnt - pageSize, ++pageNumber);
  //   });
  // }
  // loopRender(total, pageNumber);

  // 3. requestAnimationFrame + fragment 分片渲染
  // let pageSize = 20;
  // let pageNumber = 1;
  // function loopRender(currCnt, pageNumber) {
  //   if (currCnt < 0) return;
  //   let pageCnt = Math.min(pageSize, currCnt);
  //   requestAnimationFrame(() => {
  //     let fragment = document.createDocumentFragment();
  //     for (let i = 0; i < pageCnt; i++) {
  //       let li = document.createElement("li");
  //       li.innerText = `${pageNumber}---${i}`;
  //       fragment.appendChild(li);
  //     }
  //     container.append(fragment);
  //     loopRender(currCnt - pageSize, ++pageNumber);
  //   });
  // }
  // loopRender(total, pageNumber);
});
