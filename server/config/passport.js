const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("./main");
const passportJwtSocketIo = require('passport-jwt.socketio')

const isValidUser = (jwt_payload, done) => {
  User.findById(jwt_payload.id, function(err, user) {
    if (err) {
      done(err, false);
    } 
    if (user) {
      if(user.active) {
        done(null, user);
      }
      else {
        done(null, false, {message: 'Account deactivated'});
      }
    } else {
      done(null, false);
    }
  });
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

module.exports = (passport, io) => {
  passport.use(new JwtStrategy(opts, isValidUser));
  // Having issue in the client: 
  // cannot initialize the sockert after Vue has been initialized
  //io.use(passportJwtSocketIo.authorize(opts, isValidUser));
};
