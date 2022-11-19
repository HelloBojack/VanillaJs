import fs from "fs";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import path from "path";
import ejs from "ejs";
import { transformFromAst } from "babel-core";

let id = 0;

function createAsset(filePath) {
  // 1. 获取文件内容
  const source = fs.readFileSync(filePath, "utf-8");
  // console.log(source);

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
  console.log(code);

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

const graph = createGraph();

function build(graph) {
  const template = fs.readFileSync("./bundle.ejs", "utf-8");
  const data = graph.map((asset) => ({
    id: asset.id,
    code: asset.code,
    mapping: asset.mapping,
  }));
  const code = ejs.render(template, { data });

  fs.writeFileSync("./dist/bundle.js", code);
}

build(graph);
