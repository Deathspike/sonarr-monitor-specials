export class Series {
  /** @param {Series} series **/
  constructor(series) {
    this.id = series.id;
    this.monitored = series.monitored;
    this.runtime = series.runtime;
    this.title = series.title;
  }

  toString() {
    return `${this.title} (${this.id})`;
  }

  /** @type {number} */
  id;
  /** @type {boolean} */
  monitored;
  /** @type {number} */
  runtime;
  /** @type {string} */
  title;
}
