const ShowCreateAbl = require("../../abl/show/create");
const ShowDeleteAbl = require("../../abl/show/delete");
const ShowGetAbl = require("../../abl/show/get");
const ShowListAbl = require("../../abl/show/list");
const ShowUpdateAbl = require("../../abl/show/update");
const ShowSetStateAbl = require("../../abl/show/set-state");

class ShowController {
  create(dtoIn) {
    return ShowCreateAbl.create(dtoIn);
  }
  list(dtoIn) {
    return ShowListAbl.list(dtoIn);
  }
  delete(dtoIn) {
    return ShowDeleteAbl.delete(dtoIn);
  }
  get(dtoIn) {
    return ShowGetAbl.get(dtoIn);
  }
  update(dtoIn) {
    return ShowUpdateAbl.update(dtoIn);
  }
  setState(dtoIn) {
    return ShowSetStateAbl.setState(dtoIn);
  }
}

module.exports = new ShowController();
