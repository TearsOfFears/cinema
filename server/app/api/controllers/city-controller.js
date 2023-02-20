const CreateAbl = require("../../abl/cinema/create");
const ListAbl = require("../../abl/profile/list");
const DeleteAbl = require("../../abl/profile/delete");
const GetAbl = require("../../abl/profile/get");
const UpdateAbl = require("../../abl/profile/update");

class CityController {
  create(dtoIn) {
    return CreateAbl.create(dtoIn);
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
}

module.exports = new CityController();
