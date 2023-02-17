const CreateAbl = require("../../abl/profiles/create");
const ListAbl = require("../../abl/profiles/list");
const DeleteAbl = require("../../abl/profiles/delete");
const GetAbl = require("../../abl/profiles/get");
const UpdateAbl = require("../../abl/profiles/update");

class ProfilesController {
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

module.exports = new ProfilesController();
