import { Episode } from "./models/Episode.js";
import { Sonarr } from "./Sonarr.js";
import { Api } from "./utils/Api.js";
import { Store } from "./utils/Store.js";

export async function mainAsync(
  apiKey = "",
  baseUrl = "http://localhost:8989/",
  filePath = "data/episodes.jsonl",
  interval = 0,
) {
  do {
    try {
      console.log(`Checking at ${new Date().toISOString()}`);
      const api = new Api(baseUrl, apiKey);
      const episodes = new Store(filePath, Episode);
      await new Sonarr(api, episodes).updateAsync();
    } catch (error) {
      console.error(error);
    } finally {
      console.log(`Finished at ${new Date().toISOString()}`);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  } while (interval);
}
