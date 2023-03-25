const path = require("path");
module.exports = {
  requireUseCaseError(entityName, cmd) {
    const entity = entityName || path.basename(module.parent.path);
    const useCase =
      cmd || path.basename(module.parent.filename).split(".js")[0];
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
  requireDao(daoFileName) {
    const fileName =
      daoFileName || path.basename(module.parent.path).split(".js")[0];
    return require(path.join("../dao", path.join(fileName + "-dao.js")));
  },
};
