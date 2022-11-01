const element = MReact.createElement(
  "div",
  { style: { color: "red" } },
  "Like",
  "666",
  createElement("div", { id: 123 }, "xlk")
);
const rootNode = document.getElementById("root");
MReactDOM.render(element, rootNode);
