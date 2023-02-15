const CreateAbl = require("../../abl/profiles/create");
const UserListAbl = require("../../abl/user/list");
const UserDeleteAbl = require("../../abl/user/delete");
const UserGetAbl = require("../../abl/user/get");
const UserUpdateAbl = require("../../abl/user/update");

class ProfilesController {
  create(dtoIn) {
    return CreateAbl.create(dtoIn);
  }
  list(dtoIn) {
    return UserListAbl.list(dtoIn);
  }
  delete(dtoIn) {
    return UserDeleteAbl.delete(dtoIn);
  }
  get(dtoIn) {
    return UserGetAbl.get(dtoIn);
  }
  update(dtoIn) {
    return UserUpdateAbl.update(dtoIn);
  }
}

module.exports = new ProfilesController();
