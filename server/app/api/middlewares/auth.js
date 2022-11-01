const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config()
const DaoUser = require("../../dao/user/userSchema");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt")
};

module.exports = function() {
    const strategy = new Strategy(params, function(payload, done) {
        DaoUser.findById(payload.id, function(err, user) {
            if (err) {
                return done(new Error("UserNotFound"), null);
            } else if(payload.expire<=Date.now()) {
                return done(new Error("TokenExpired"), null);
            } else{
                return done(null, user);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session:false});
        }
    };
};