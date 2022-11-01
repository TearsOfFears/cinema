const {  validationResult } = require('express-validator')
const {HttpStatusCode} = require("./../errors/helpers/error")
module.exports =  (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    const errorsExp= errors.array().map(err => ({[err.param]: err.msg }));
    return res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: errorsExp,
    })
}