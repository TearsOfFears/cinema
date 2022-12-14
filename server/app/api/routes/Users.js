const Router = require('express').Router;
const UserController = require('../controllers/UsersController');
const response = require('./../middlewares/responseMiddle');
const validate = require('./../middlewares/validate');
const {
    registrationValidation,
    loginValidation,
    deleteValidation,
    getValidation,
    updateValidation
} = require('../validation/user-validation');
const auth = require('../middlewares/auth')();

const router = new Router();

router.post('/registration', registrationValidation(), validate, response(async (dtoIn) => UserController.registration(dtoIn)));
router.post('/login', loginValidation(), validate, response(async (dtoIn) => UserController.login(dtoIn)));
router.get('/auth', auth.authenticate(), response(async (dtoIn) => UserController.auth(dtoIn)));
router.get('/list', auth.authenticate(), response(async (dtoIn) => UserController.list(dtoIn)));

router.get('/get', getValidation(), validate, auth.authenticate(), response(async (dtoIn) => UserController.get(dtoIn)));
router.patch('/update', updateValidation(), validate, auth.authenticate(), response(async (dtoIn) => UserController.update(dtoIn)));
router.delete('/delete', deleteValidation(), validate, auth.authenticate(), response(async (dtoIn) => UserController.delete(dtoIn)));

module.exports = router;

