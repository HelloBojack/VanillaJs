const element = MReact.createElement("h1", { style: { color: "red" } }, "Like");
class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    };
    this.btn = createRef();
    this.div = createRef();
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 1 });
    this.setState({ num: this.state.num + 1 });
    console.log(this.btn.current);
    console.log(this.div.current);
  };
  render() {
    return MReact.createElement(
      "button",
      { onClick: this.handleClick, ref: this.btn },
      this.props.name,
      this.state.num,
      MReact.createElement(FnCom, {
        name: this.props.name,
        num: this.state.num,
        ref: this.div,
      })
    );
  }
}

function FnCom({ name, num, ref }) {
  return MReact.createElement(
    "div",
    { ref: ref },
    MReact.createElement(ClassComponent2, { name, num })
  );
}
class ClassComponent2 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return MReact.createElement(
      "div",
      { name: this.props.name },
      this.props.name,
      this.props.num
    );
  }
}

let el2 = MReact.createElement(ClassComponent, {
  name: "bojack",
});

const rootNode = document.getElementById("root");
// MReactDOM.render(element, rootNode);
MReactDOM.render(el2, rootNode);
