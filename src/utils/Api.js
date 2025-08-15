export class Api {
  /** @type {string} */
  #baseUrl;
  /** @type {Record<string, string>} */
  #headers;

  /**
   * @param {string} baseUrl
   * @param {string} apiKey
   */
  constructor(baseUrl, apiKey) {
    this.#baseUrl = baseUrl;
    this.#headers = { "X-Api-Key": apiKey };
  }

  /**
   * @template T
   * @param {string} relativeUrl
   * @param {{ new (source: T): T }} type
   */
  async getAsync(relativeUrl, type) {
    const url = new URL(relativeUrl, this.#baseUrl);
    const response = await fetch(url, { headers: this.#headers });
    const result = await response.json();
    if (Array.isArray(result)) {
      return result.map((item) => new type(item));
    } else {
      throw new Error();
    }
  }

  /**
   * @template T
   * @param {string} relativeUrl
   * @param {T} model
   */
  async putAsync(relativeUrl, model) {
    const body = JSON.stringify(model);
    const headers = { "Content-Type": "application/json", ...this.#headers };
    const method = "PUT";
    const url = new URL(relativeUrl, this.#baseUrl);
    return await fetch(url, { body, headers, method });
  }
}
