const jwtActions = require("./../../api/components/jwts");
const passwordHashing = require("./../../api/components/passwordHashing");
const User = require("./user");
require("dotenv/config");

class AuthAbl extends User {
  constructor(ctx) {
    super(ctx);
    this.passwordHashing = passwordHashing;
    this.jwt = jwtActions;
  }
  async registration(dtoIn) {
    const { password, email, username, phone } = dtoIn;
    const password_hash = this.passwordHashing.generatePassword(password);
    const standardProfile = await this.daoProfiles.getProfilesByName({
      name: "Standard",
    });
    let user, tokens;
    try {
      user = await this.dao.create({
        email,
        username,
        password_hash,
        phone,
        profiles: [standardProfile],
      });
      tokens = this.jwt.createBothToken(user);
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new this.errors.UserIsExist(e);
      }
      throw new this.errors.CannotRegistration(e);
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
      user = await this.dao.getByEmail(email);
    } catch (e) {
      throw new this.errors.CannotLogin(e);
    }
    if (!user) {
      throw new this.errors.UserNotFound();
    }
    const match = await this.passwordHashing.verifyPassword(password, user);
    if (match) {
      const tokens = this.jwt.createBothToken(user);
      const { password_hash, ...dtoOut } = user;
      return {
        dtoOut,
        tokens,
      };
    } else {
      throw new this.errors.PasswordIsNotCorrect();
    }
  }
  async refresh(dtoIn) {
    const { id } = dtoIn;
    let user;
    try {
      user = await this.dao.get(id);
    } catch (e) {
      throw new this.errors.CannotGetUser(e);
    }
    if (!user) {
      throw new this.errors.UserNotFound();
    }
    const tokens = this.jwt.createBothToken(user);
    const { password_hash, ...dtoOut } = user;
    return {
      dtoOut,
      tokens,
    };
  }
}

module.exports = AuthAbl;
