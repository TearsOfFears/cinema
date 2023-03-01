const CreateAbl = require("../../abl/movie/create");
const ListAbl = require("../../abl/movie/list");
const DeleteAbl = require("../../abl/movie/delete");
const GetAbl = require("../../abl/movie/get");
const UpdateAbl = require("../../abl/movie/update");
const SetStateAbl = require("../../abl/movie/set-state");
class MovieController {
  createByManual(dtoIn) {
    return CreateAbl.createByManual(dtoIn);
  }
  createByImdb(dtoIn) {
    return CreateAbl.createByImdb(dtoIn);
  }
  list(dtoIn) {
    return ListAbl.list(dtoIn);
  }
  delete(dtoIn) {
    return DeleteAbl.delete(dtoIn);
  }
  get(dtoIn) {
    return GetAbl.get(dtoIn);
  }
  update(dtoIn) {
    return UpdateAbl.update(dtoIn);
  }
  setState(dtoIn) {
    return SetStateAbl.setState(dtoIn);
  }
}

module.exports = new MovieController();
