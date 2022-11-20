const data = [
  {
    parent: 3,
    id: 4,
    value: 4,
  },
  {
    parent: null,
    id: 1,
    value: 1,
  },
  {
    parent: 1,
    id: 2,
    value: 2,
  },
  {
    parent: 1,
    id: 3,
    value: 3,
  },
];

function unflat(arr, parent = null) {
  let tranList = arr.filter((item) => item.parent === parent);
  tranList.forEach((element) => {
    element.children = unflat(arr, element.id);
  });
  return tranList;
}

console.log(unflat(data));
