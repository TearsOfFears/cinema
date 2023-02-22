const fetch = require("node-fetch");
const HTTPS_METHOD = {
  Post: "POST",
  Get: "GET",
  Delete: "DELETE",
};
class AppClient {
  constructor(apiUri, apiKey) {
    this.fetch = fetch;
    this.apiUri = apiUri;
    this.apiKey = apiKey;
  }
  async fetchInstance(uri, httpMethod, data) {
    const options = {
      method: httpMethod,
      headers: {
        "X-CSCAPI-KEY": this.apiKey,
      },
    };
    options.body ||= data;
    return await this.fetch(uri, options);
  }
  async post(data, useCase) {
    const uri = `${this.apiUri}/${useCase}`;
    const response = await this.fetchInstance(uri, HTTPS_METHOD.Get, data);
    return await response.json();
  }
  async get(useCase) {
    const uri = `${this.apiUri}/${useCase}`;
    const response = await this.fetchInstance(uri, HTTPS_METHOD.Get);
    return await response.json();
  }
}

module.exports = AppClient;
