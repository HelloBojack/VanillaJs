const fs = require("fs");

interface IFilerReader {
  isJSON(file: string): boolean;
  readText(file: string): string;
  readJSON(file: string): unknown;
}

class FilerReader implements IFilerReader {
  isJSON(file: string): boolean {
    return file.endsWith(".json");
  }
  readText(file: string): string {
    return fs.readFileSync(file, "utf-8").toString();
  }
  readJSON(file: string): unknown {
    return JSON.parse(fs.readFileSync(file, "utf-8").toString());
  }
}

class DirectoryScraper {
  constructor(public dirPath: string, public filerReader: IFilerReader) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce((acc: Record<string, unknown>, file: string) => {
        if (this.filerReader.isJSON(file)) {
          acc[file] = this.filerReader.readJSON(`./data/${file}`);
        } else {
          acc[file] = this.filerReader.readText(`./data/${file}`);
        }

        return acc;
      }, {});
  }
}

const filerReader = new FilerReader();
const dirReader = new DirectoryScraper("./data", filerReader);

const res = dirReader.scanFiles();
console.log("res", res);
