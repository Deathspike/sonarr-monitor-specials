import { Api } from "./utils/Api.js";
import { Episode } from "./models/Episode.js";
import { Series } from "./models/Series.js";
import { Store } from "./utils/Store.js";

export class Sonarr {
  /** @type {Api} */
  #api;
  /** @type {Store<Episode>} */
  #episodes;

  /**
   * @param {Api} api
   * @param {Store<Episode>} episodes
   */
  constructor(api, episodes) {
    this.#api = api;
    this.#episodes = episodes;
  }

  async updateAsync() {
    const seriesApi = "/api/v3/series";
    for (const series of await this.#api.getAsync(seriesApi, Series)) {
      if (!series.monitored) continue;
      const episodeApi = `/api/v3/episode?seriesId=${series.id}`;
      const episodeMonitorApi = "/api/v3/episode/monitor";
      for (const episode of await this.#api.getAsync(episodeApi, Episode)) {
        if (!(await this.#needsUpdateAsync(episode))) continue;
        const monitored = this.#shouldMonitor(series, episode);
        const model = { episodeIds: [episode.id], monitored };
        const response = await this.#api.putAsync(episodeMonitorApi, model);
        if (response.ok) {
          await this.#episodes.appendAsync(episode);
          console.log(`Finished ${series} ${episode}`);
        } else {
          console.log(`Rejected ${series} ${episode}`);
        }
      }
    }
  }

  /** @param {Episode} episode */
  async #needsUpdateAsync(episode) {
    if (episode.seasonNumber) return false;
    const previous = await this.#episodes.findAsync(episode.id);
    return !previous || !previous.isSame(episode);
  }

  /**
   * @param {Series} series
   * @param {Episode} episode
   */
  #shouldMonitor(series, episode) {
    if (!episode.runtime) return true;
    if (!series.runtime) return true;
    return episode.runtime >= series.runtime / 2;
  }
}
