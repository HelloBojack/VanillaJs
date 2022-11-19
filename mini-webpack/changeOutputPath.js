export default class changeOutputPath {
  apply(hooks) {
    hooks.emitFile.tap("changeOutputPath", (context) => {
      context.changeOutputPath("./dist/xlk_bundle.js");
    });
  }
}
