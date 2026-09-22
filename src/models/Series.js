export class Series {
  /** @readonly @type {number} */
  id;
  /** @readonly @type {boolean} */
  monitored;
  /** @readonly @type {number} */
  runtime;
  /** @readonly @type {string} */
  title;

  /** @param {Series} series */
  constructor(series) {
    this.id = series.id;
    this.monitored = series.monitored;
    this.runtime = series.runtime;
    this.title = series.title;
  }

  toString() {
    return `${this.title} (${this.id})`;
  }
}
