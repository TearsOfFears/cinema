const jwts = require("./../components/jwts");
const { HttpStatusCode } = require("./../errors/helpers/error");
module.exports = (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  );
  const refreshToken = req.cookies;
  if (accessToken) {
    try {
      const userData = jwts.verifyAccessToken(accessToken);
      // let test = jwts.createRefreshToken(decoded);
      // res.userId = decoded._id;
      console.log("userData", userData);
      if (!userData) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "You dont have access" });
      }
      // req.user = userData;
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
