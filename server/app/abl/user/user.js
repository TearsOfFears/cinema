const DaoUser = require("../../dao/user-dao");
const DaoProfiles = require("../../dao/profiles-dao");
const UserErrorRegistration =
  require("./../../api/errors/user-error").Registration;
const UserErrorLogin = require("./../../api/errors/user-error").Login;
const AuthError = require("./../../api/errors/user-error").Auth;
const jwtActions = require("./../../api/components/jwts");
require("dotenv/config");
const passwordHashing = require("./../../api/components/passwordHashing");
class UserAuthAbl {
  constructor() {
    this.dao = DaoUser;
    this.daoProfiles = DaoProfiles;
    this.passwordHashing = passwordHashing;
    this.jwt = jwtActions;
  }
  async registration(dtoIn) {
    const { password, email, username } = dtoIn;
    const passwordHash = this.passwordHashing.generatePassword(password);
    let standardProflile = await this.daoProfiles.getStandardProfile({
      name: "Standard",
    });
    let user, tokens;
    try {
      user = await this.dao.create({
        email,
        username,
        passwordHash,
        profiles: [standardProflile],
      });
      tokens = this.jwt.createBothToken(user);
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new UserErrorRegistration.UserIsExist(e);
      }
      throw new UserErrorRegistration.CannotRegistration(e);
    }
    return {
      user,
      tokens,
    };
  }

  async login(dtoIn) {
    const { password, email } = dtoIn;
    let user;
    try {
      user = await this.dao.getByEmail({ email });
    } catch (e) {
      throw new UserErrorLogin.CannotLogin(e);
    }
    if (!user) {
      throw new UserErrorLogin.UserNotFound();
    }
    const match = await this.passwordHashing.verifyPassword(password, user);
    if (match) {
      const tokens = this.jwt.createBothToken(user);
      const { passwordHash, ...dtoOut } = user;
      return {
        dtoOut,
        tokens,
      };
    } else {
      throw new UserErrorLogin.PasswordIsNotCorrect();
    }
  }
  async refresh(dtoIn) {
    const { id } = dtoIn;
    let user;
    try {
      user = await this.dao.get(id);
    } catch (e) {
      throw new AuthError.CannotGetUser(e);
    }
    if (!user) {
      throw new UserErrorLogin.UserNotFound();
    }
    const tokens = this.jwt.createBothToken(user);
    const { passwordHash, ...dtoOut } = user;
    return {
      dtoOut,
      tokens,
    };
  }
}

module.exports = new UserAuthAbl();
