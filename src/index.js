import process from "node:process";
import { Api } from "./utils/Api.js";
import { Episode } from "./models/Episode.js";
import { Sonarr } from "./Sonarr.js";
import { Store } from "./utils/Store.js";

const apiKey = process.env["API_KEY"] || "";
const baseUrl = process.env["BASE_URL"] || "http://localhost:8989/";
const filePath = process.env["FILE_PATH"] || "data/episodes.jsonl";

while (true) {
  try {
    console.log(`Checking at ${new Date().toISOString()}`);
    const api = new Api(baseUrl, apiKey);
    const episodes = new Store(filePath, Episode);
    await new Sonarr(api, episodes).updateAsync();
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`Finished at ${new Date().toISOString()}`);
    await new Promise((resolve) => setTimeout(resolve, 86400000));
  }
}
