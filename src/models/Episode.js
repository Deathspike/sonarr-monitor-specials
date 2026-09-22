export class Episode {
  /** @readonly @type {number} */
  episodeNumber;
  /** @readonly @type {number} */
  id;
  /** @readonly @type {number} */
  runtime;
  /** @readonly @type {number} */
  seasonNumber;
  /** @readonly @type {number} */
  tvdbId;

  /** @param {Episode} episode */
  constructor(episode) {
    this.episodeNumber = episode.episodeNumber;
    this.id = episode.id;
    this.runtime = episode.runtime;
    this.seasonNumber = episode.seasonNumber;
    this.tvdbId = episode.tvdbId;
  }

  /** @param {Episode} episode */
  isSame(episode) {
    return (
      episode.episodeNumber === this.episodeNumber &&
      episode.id === this.id &&
      episode.runtime === this.runtime &&
      episode.seasonNumber === this.seasonNumber &&
      episode.tvdbId === this.tvdbId
    );
  }

  toString() {
    const episodeName = `${this.episodeNumber}`.padStart(2, "0");
    const seasonName = `${this.seasonNumber}`.padStart(2, "0");
    return `S${seasonName}E${episodeName} (${this.id})`;
  }
}
