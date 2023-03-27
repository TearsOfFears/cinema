const { STATES } = require("../constants");
const User = require("./user");
class SetProfileAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async setProfile() {
    const user = await this.dao.get(this.dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new this.errors.UserIsNotActiveState();
    }
    let profilesArrayId = await this.daoProfiles.getProfilesByIds(this.dtoIn);
    if (profilesArrayId.length !== this.dtoIn.profilesArrayId.length) {
      throw new this.errors.OneOfTheProfilesDoesNotExist();
    }
    let dtoOut;
    try {
      const { id, ...dto } = this.dtoIn;
      dtoOut = await this.dao.updateProfiles(id, dto);
    } catch (e) {
      throw new this.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = SetProfileAbl;
