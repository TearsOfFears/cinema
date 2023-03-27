const CreateAbl = require("../../abl/cinema/create");
const ListAbl = require("../../abl/cinema/list");
const DeleteAbl = require("../../abl/cinema/delete");
const GetAbl = require("../../abl/cinema/get");
const UpdateAbl = require("../../abl/cinema/update");
const SetStateAbl = require("../../abl/cinema/set-state");
const Context = require("./../components/context");
class CinemaController {
  create(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(CreateAbl).create();
  }
  list(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(ListAbl).list();
  }
  delete(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(DeleteAbl).delete();
  }
  get(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(GetAbl).get();
  }
  update(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(UpdateAbl).update();
  }
  setState(data) {
    const ctx = new Context(data);
    return ctx.createUseCaseInstance(SetStateAbl).setState();
  }
}

module.exports = new CinemaController();
