const fs = require("fs");

abstract class DirectoryScraper {
  constructor(public dirPath: string) {}

  scanFiles() {
    return fs
      .readdirSync(this.dirPath)
      .reduce((acc: Record<string, unknown>, file: string) => {
        if (this.isJSON(file)) {
          acc[file] = this.readJSON(`./data/${file}`);
        } else {
          acc[file] = this.readText(`./data/${file}`);
        }

        return acc;
      }, {});
  }

  abstract isJSON(file: string): boolean;
  abstract readText(file: string): string;
  abstract readJSON(file: string): unknown;
}

class FilerReader extends DirectoryScraper {
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

const dirReader = new FilerReader("./data");

const res = dirReader.scanFiles();
console.log("res", res);
