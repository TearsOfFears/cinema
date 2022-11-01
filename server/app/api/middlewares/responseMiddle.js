const {HttpStatusCode} = require("./../errors/helpers/error")

module.exports = (controller) => async (req, res, next) => {
    try {
        let data;
        if (req.user)
          data=req.user;
        else
            data=req.body;
        const object  = await controller(data);
        return res.status(HttpStatusCode.OK).json({...object});
    } catch (error) {
        return next(error);
    }
};