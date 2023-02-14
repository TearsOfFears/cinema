const jwt = require("jsonwebtoken");
require("dotenv/config");

class jwtActions {
  constructor() {
    this.jwt = jwt;
  }
  createRefreshToken(user) {
    return this.jwt.sign(user, `${process.env.SECRET_REFRESH}`, {
      expiresIn: 60 * 60 * 24 * 5,
    });
  }
  createAccessToken(user) {
    return this.jwt.sign(user, `${process.env.SECRET_ACCESS}`, {
      expiresIn: 60 * 60 * 2,
    });
  }
  createBothToken(user) {
    const access = this.createAccessToken(user);
    const refresh = this.createRefreshToken(user);
    return { access, refresh };
  }

  verifyRefreshToken(refresh_token) {
    return this.jwt.verify(refresh_token, `${process.env.SECRET_REFRESH}`);
  }
  verifyAccessToken(access_token) {
    return this.jwt.verify(access_token, `${process.env.SECRET_ACCESS}`);
  }

  verifyBothToken(access_token, refresh_token) {
    const access = this.verifyAccessToken(access_token);
    const refresh = this.verifyRefreshToken(refresh_token);
    return { access, refresh };
  }
  //
  // async saveRefreshToken(refresh_token, user){
  //     await AppDataSource
  //         .createQueryBuilder()
  //         .update(User)
  //         .set(refresh_token = refresh_token)
  //         .where({email: user.email})
  //         .execute()
  //
  // }
}

module.exports = new jwtActions();
