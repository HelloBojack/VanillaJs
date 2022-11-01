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
    this.state = {
      num: 1,
    };
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 1 });
    this.setState({ num: this.state.num + 1 });
  };
  render() {
    return MReact.createElement(
      "button",
      { onClick: this.handleClick },
      this.props.name,
      this.state.num
    );
  }
}
let el3 = MReact.createElement(ClassComponent, { name: "bojack" });

const rootNode = document.getElementById("root");
// MReactDOM.render(element, rootNode);
MReactDOM.render(el3, rootNode);
