const btn = document.querySelector("#button");
const container = document.querySelector("#container");
const list_all = document.querySelector(".list-all");
const list_view = document.querySelector(".list-view");
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
const itemHeight = 20;
let startIndex = 0,
  endIndex = 20;

const listAllHeight = total * itemHeight;
list_all.style.height = listAllHeight + "px";
const listViewCnt = 10;

function render(listData) {
  requestAnimationFrame(() => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < listData.length; i++) {
      let div = document.createElement("div");
      div.className = "item";
      div.innerText = `${i}`;
      fragment.appendChild(div);
    }
    const itemList = document.querySelectorAll(".item");
    let length = 10;
    while (length) {
      itemList[0] && list_view.removeChild(itemList[0]);
      length--;
    }
    list_view.appendChild(fragment);
  });
}

btn.addEventListener("click", async () => {
  const list = await getData();
  let listData = list.slice(startIndex, endIndex);
  container.addEventListener("scroll", (e) => {
    let scrollTop = e.target.scrollTop;
    startIndex = Math.floor(scrollTop / itemHeight);
    endIndex = startIndex + listViewCnt;
    listData = list.slice(startIndex, endIndex);
    render(listData);
    list_view.style.transform = `translate3d(0,${scrollTop},0)`;
  });
  render(listData);
});
