const DaoUser = require("../../dao/user/dao.js");
const DeleteError = require("./../../api/errors/user-error").Delete

class DeleteAbl {
    constructor() {
        this.dao = DaoUser;
    }

    async delete(dtoIn) {
        const user = await this.dao.get(dtoIn.id);
        if (!user) {
            throw  new DeleteError.UserIsNotExist()
        }
        try {
            await this.dao.delete(dtoIn.id);
        } catch (e) {
            throw new DeleteError.CannotDelete()
        }
        return dtoIn
    }
}

module.exports = new DeleteAbl()