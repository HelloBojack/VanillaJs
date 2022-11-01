const element = MReact.createElement(
  "div",
  { style: { color: "red" } },
  "Like",
  123
);

function FnCom() {
  return MReact.createElement("h1", {}, element);
}

let el2 = MReact.createElement(FnCom, { name: 100 });

class ClassComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return MReact.createElement("h1", {}, this.props.name);
  }
}
let el3 = MReact.createElement(ClassComponent, { name: "bojack" });

const rootNode = document.getElementById("root");
// MReactDOM.render(element, rootNode);
MReactDOM.render(el3, rootNode);
