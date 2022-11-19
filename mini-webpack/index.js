import fs from "fs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
import ejs from "ejs";
import { transformFromAst } from "babel-core";
import JSONLoader from "./JSONLoader.js";
import changeOutputPath from "./changeOutputPath.js";
import { SyncHook } from "tapable";

const config = {
  module: {
    rules: [
      {
        test: /\.json/,
        use: JSONLoader,
      },
    ],
  },
  plugins: [new changeOutputPath()],
};

let id = 0;
const hooks = {
  emitFile: new SyncHook(["context"]),
};

function createAsset(filePath) {
  // 1. 获取文件内容
  let source = fs.readFileSync(filePath, "utf-8");
  // console.log(source);

  // loader
  const loader = config.module.rules;
  loader.forEach(({ test, use }) => {
    if (test.test(filePath)) {
      source = use(source);
    }
  });

  // 2. 获取依赖关系
  const ast = parser.parse(source, {
    sourceType: "module",
  });
  // console.log(ast);

  const dep = [];
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      dep.push(node.source.value);
    },
  });

  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });

  return {
    filePath,
    code,
    dep,
    mapping: {},
    id: id++,
  };
}

function createGraph() {
  const mainAsset = createAsset("./example/main.js");
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.dep.forEach((relativePath) => {
      const childAsset = createAsset(path.resolve("./example", relativePath));
      asset.mapping[relativePath] = childAsset.id;
      queue.push(childAsset);
    });
  }
  return queue;
}

function initPlugins() {
  const plugins = config.plugins;
  plugins.forEach((plugin) => plugin.apply(hooks));
}

initPlugins();
const graph = createGraph();

function build(graph) {
  const template = fs.readFileSync("./bundle.ejs", "utf-8");
  const data = graph.map((asset) => ({
    id: asset.id,
    code: asset.code,
    mapping: asset.mapping,
  }));
  const code = ejs.render(template, { data });

  let output = "./dist/bundle.js";
  const context = {
    changeOutputPath(path) {
      output = path;
    },
  };
  hooks.emitFile.call(context);
  fs.writeFileSync(output, code);
}

build(graph);
