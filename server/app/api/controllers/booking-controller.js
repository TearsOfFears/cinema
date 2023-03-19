const CreateAbl = require("../../abl/booking/create");
const ListAbl = require("../../abl/cinema/list");
const DeleteAbl = require("../../abl/cinema/delete");
const GetAbl = require("../../abl/cinema/get");
const UpdateAbl = require("../../abl/cinema/update");

class BookingController {
  create(dtoIn) {
    return CreateAbl.create(dtoIn);
  }
  // list(dtoIn) {
  //   return ListAbl.list(dtoIn);
  // }
  // delete(dtoIn) {
  //   return DeleteAbl.delete(dtoIn);
  // }
  // get(dtoIn) {
  //   return GetAbl.get(dtoIn);
  // }
  // update(dtoIn) {
  //   return UpdateAbl.update(dtoIn);
  // }
}

module.exports = new BookingController();
