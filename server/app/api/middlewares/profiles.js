const jwts = require("./../components/jwts");
const { HttpStatusCode } = require("./../errors/helpers/error");
module.exports = (req, res, next) => {
  const accessToken = (req.headers.authorization || "").replace(
    /Bearer\s?/,
    ""
  );
  if (accessToken) {
    try {
      const userData = jwts.verifyAccessToken(accessToken);
      // let test = jwts.createRefreshToken(decoded);
      // res.userId = decoded._id;
      if (!userData) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "You dont have access" });
      }
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
