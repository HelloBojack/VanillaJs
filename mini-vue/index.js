function createApp(app, options) {
  const _this = {};
  const root = document.querySelector(app);
  const allNodes = root.querySelectorAll("*");

  _this.root = root;
  _this.data = createRef(options.data, allNodes);

  render(_this.data);
  bindEvent.apply(_this.data, [allNodes, options.methods]);
}
function bindEvent(nodes, methods) {
  nodes.forEach((node) => {
    const handlerName = node.getAttribute("@click");
    if (handlerName) {
      node.addEventListener("click", methods[handlerName].bind(this));
    }
  });
}

function render(refs) {
  for (const key in refs) {
    _render(refs[key]);
  }
}
function update({ deps, value }) {
  _render({ deps, value });
}
function _render({ deps, value }) {
  deps.forEach((el) => {
    el.textContent = value;
  });
}

function ref(defaultValue) {
  const refWrapper = {
    deps: new Set(),
    _value: defaultValue,
    _defaultValue: defaultValue,
  };

  const proxy = new Proxy(refWrapper, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop === "value" ? "_value" : prop, receiver);
    },
    set(target, prop, receiver) {
      Reflect.set(target, prop === "value" ? "_value" : prop, receiver);
      update(proxy);
    },
  });
  return proxy;
}

function createRef(refs, nodes) {
  const contentReg = /\{\{(.*)\}\}/;
  nodes.forEach((node) => {
    if (contentReg.test(node.textContent)) {
      const refKey = node.textContent.match(contentReg)[1].trim();
      refs[refKey].deps.add(node);
    }
  });
  return refs;
}

createApp("#app", {
  data: {
    title: ref("title"),
    content: ref("content"),
  },
  methods: {
    changeTitle() {
      this.title.value = "title2";
    },
    changeContent() {
      this.content.value = "content2";
    },
  },
});
