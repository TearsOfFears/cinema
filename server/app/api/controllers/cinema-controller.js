const CreateAbl = require("../../abl/cinema/create");
const ListAbl = require("../../abl/cinema/list");
const DeleteAbl = require("../../abl/cinema/delete");
const GetAbl = require("../../abl/cinema/get");
const UpdateAbl = require("../../abl/cinema/update");
const Context = require("./../components/context");
class CinemaController {
  create(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(CreateAbl).create(ctx.dtoIn);
  }
  list(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(ListAbl).list(ctx.dtoIn);
  }
  delete(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(DeleteAbl).delete(ctx.dtoIn);
  }
  get(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(GetAbl).get(ctx.dtoIn);
  }
  update(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(UpdateAbl).update(ctx.dtoIn);
  }
}

module.exports = new CinemaController();
