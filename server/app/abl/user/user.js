const DaoUser = require("../../dao/user/dao.js");
const UserErrorRegistration = require("./../../api/errors/user-error").Registration
const UserErrorLogin = require("./../../api/errors/user-error").Login
const jwt = require('jsonwebtoken')
require("dotenv/config")
const bcrypt = require("bcrypt");

class UserAuthAbl {
    constructor() {
        this.dao = DaoUser;
    }

    async registration(dtoIn) {
        const {password, email, username} = dtoIn;
        //const salt = bcrypt.genSalt(8)
        const passwordHash = bcrypt.hashSync(password, 8);
        try {
            const user = await this.dao.create({email, username, passwordHash});
            const payload = {
                id: user._id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            const token = jwt.sign(payload, process.env.JWTSECRET);
            return {
                user,
                token
            };
        } catch (e) {
            throw new UserErrorRegistration.UserIsExist(e)
        }

    }

    async login(dtoIn) {
        const {password, email} = dtoIn;
        let user
        try {
            user = await this.dao.getByEmail({email: email});
        } catch (e) {
            throw  new UserErrorLogin.CannotLogin(e);
        }
        if (!user) {
            throw  new UserErrorLogin.UserNotFound();
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            const payload = {
                id: user._id,
                expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            const token = jwt.sign(payload, process.env.JWTSECRET);
            const {passwordHash, ...dtoOut} = user
            return {
                dtoOut,
                token
            };
        } else {
            throw new UserErrorLogin.PasswordIsNotCorrect();
        }
    }

    async auth(dtoIn) {
        const {id} = dtoIn;
        let user
        try {
            user = await this.dao.get(id);
        } catch (e) {
            throw  new UserErrorLogin.CannotLogin(e);
        }
        if (!user) {
            throw  new UserErrorLogin.UserNotFound();
        }
        const payload = {
            id: user._id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
        };
        const token = jwt.sign(payload, process.env.JWTSECRET);
        const {passwordHash, ...dtoOut} = user
        return {
            dtoOut,
            token
        }
    }
}

module.exports = new UserAuthAbl()