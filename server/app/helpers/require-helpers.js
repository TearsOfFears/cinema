const path = require("path");
module.exports = {
  requireUseCaseError(entity, useCase) {
    return require(path.join("../api/errors", path.join(entity + "-error.js")))[
      useCase[0].toUpperCase() + useCase.slice(1)
    ];
  },
  requireAllErrors(errorsFile) {
    const fileName =
      errorsFile || path.basename(module.parent.path).split(".js")[0];
    return require(path.join(
      "../api/errors",
      path.join(fileName + "-error.js")
    ));
  },
  requireDao(entity) {
    return require(path.join("../dao", path.join(entity + "-dao.js")));
  },
};
