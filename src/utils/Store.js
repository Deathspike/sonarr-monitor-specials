import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import * as readline from "node:readline";

/** @template {{ id: number }} T */
export class Store {
  /** @type {Map<number, T>} */
  #entries;
  /** @type {string} */
  #filePath;
  /** @type {boolean} */
  #triedLoad;
  /** @type {{ new (source: T): T }} */
  #type;

  /**
   * @param {string} filePath
   * @param {{ new (source: T): T }} type
   */
  constructor(filePath, type) {
    this.#entries = new Map();
    this.#filePath = filePath;
    this.#triedLoad = false;
    this.#type = type;
  }

  /** @param {T} item */
  async appendAsync(item) {
    const json = JSON.stringify(item);
    await fs.promises.appendFile(this.#filePath, json + os.EOL);
    this.#entries.set(item.id, item);
  }

  /** @param {number} id */
  async findAsync(id) {
    if (!this.#triedLoad) {
      await this.#tryLoadAsync();
      this.#triedLoad = true;
    }
    return this.#entries.get(id);
  }

  async #tryLoadAsync() {
    try {
      const crlfDelay = Infinity;
      const input = fs.createReadStream(this.#filePath);
      const rl = readline.createInterface({ crlfDelay, input });
      for await (const line of rl) {
        const json = JSON.parse(line);
        const item = new this.#type(json);
        this.#entries.set(item.id, item);
      }
    } catch (err) {
      if (err instanceof Error && "code" in err && err.code === "ENOENT") {
        const directoryPath = path.dirname(this.#filePath);
        await fs.promises.mkdir(directoryPath, { recursive: true });
      } else {
        throw err;
      }
    }
  }
}
