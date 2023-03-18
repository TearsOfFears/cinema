const CinemaCreateAbl = require("../../abl/cinema-hall/create");
const CinemaDeleteAbl = require("../../abl/Cinema/delete");
const CinemaGetAbl = require("../../abl/Cinema/get");
const CinemaListAbl = require("../../abl/Cinema/list");
const CinemaUpdateAbl = require("../../abl/Cinema/update");
const CinemaSetStateAbl = require("../../abl/Cinema/set-state");

class CinemaHallController {
  create(dtoIn) {
    return CinemaCreateAbl.create(dtoIn);
  }
  list(dtoIn) {
    return CinemaListAbl.list(dtoIn);
  }
  delete(dtoIn) {
    return CinemaDeleteAbl.delete(dtoIn);
  }
  get(dtoIn) {
    return CinemaGetAbl.get(dtoIn);
  }
  update(dtoIn) {
    return CinemaUpdateAbl.update(dtoIn);
  }
  setState(dtoIn) {
    return CinemaSetStateAbl.setState(dtoIn);
  }
}

module.exports = new CinemaHallController();
