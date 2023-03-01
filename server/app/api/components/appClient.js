const fetch = require("node-fetch");
const HTTPS_METHOD = {
  Post: "POST",
  Get: "GET",
  Delete: "DELETE",
};
class AppClient {
  constructor(apiUri, apiKey, headers) {
    this.fetch = fetch;
    this.apiUri = apiUri;
    this.apiKey = apiKey;
    this.header = headers;
  }
  async fetchInstance(uri, httpMethod, data) {
    const options = {
      method: httpMethod,
      headers: {
        [this.header]: this.apiKey,
      },
    };
    if (options.method === HTTPS_METHOD.Get) {
      uri += "?" + new URLSearchParams(data).toString();
    } else {
      options.body = JSON.stringify(data);
    }
    return await this.fetch(uri, options);
  }
  async post(useCase, data) {
    const uri = `${this.apiUri}/${useCase}`;
    const response = await this.fetchInstance(uri, HTTPS_METHOD.Post, data);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }
  async get(useCase, data) {
    const uri = `${this.apiUri}/${useCase}`;
    const response = await this.fetchInstance(uri, HTTPS_METHOD.Get, data);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  }
}

module.exports = AppClient;
