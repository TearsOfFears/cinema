const jwts = require("./../components/jwts");
const { HttpStatusCode } = require("./../errors/helpers/error");
const DaoProfiles = require("./../../dao/profiles-dao");
module.exports = (rolesCheck) => async (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  );
  const refreshToken = req.cookies;
  if (accessToken) {
    try {
      const userData = jwts.verifyAccessToken(accessToken);
      const { profiles } = userData;
      const profileId = await DaoProfiles.getProfilesByName({
        name: rolesCheck,
      });
      let hasRole = false;
      if (profiles.includes(profileId)) {
        hasRole = true;
      }
      if (!hasRole) {
        res.status(HttpStatusCode.NOT_FOUND).json({
          message: "You dont have permission to this command",
        });
      }
      if (!userData) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "You dont have access" });
      }
      req.userId = userData.userId;
      next();
    } catch (err) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "You dont have access" });
    }
  }
  if (!accessToken) {
    res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: "You dont have access" });
  }
};
