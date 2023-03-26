const { HttpStatusCode } = require("./../errors/helpers/error");

module.exports = (controller) => async (req, res, next) => {
  try {
    const fullData = { req, res };
    const { tokens, ...object } = await controller(fullData);
    if (tokens) {
      res.cookie("refreshToken", tokens.refresh, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      object.accessToken = tokens.access;
    }
    return res.status(HttpStatusCode.OK).json({ ...object });
  } catch (error) {
    return next(error);
  }
};
