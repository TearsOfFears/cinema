const DaoUser = require("../../dao/user-dao");
const { STATES } = require("../constants");
const DaoProfiles = require("../../dao/profiles-dao");
const Error = require("./../../api/errors/user-error").SetProfile;

class SetProfileAbl {
  constructor() {
    this.dao = DaoUser;
    this.daoProfiles = DaoProfiles;
  }
  async setProfile(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new Error.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new Error.UserIsNotActiveState();
    }
    let profilesArrayId = await this.daoProfiles.getProfilesByIds(dtoIn);
    if (profilesArrayId.length !== dtoIn.profilesArrayId.length) {
      throw new Error.OneOfTheProfilesDoesNotExist();
    }
    let dtoOut;
    try {
      const { id, ...dto } = dtoIn;
      dtoOut = await this.dao.updateProfiles(id, dto);
    } catch (e) {
      throw new Error.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = new SetProfileAbl();
