const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const config = require("./main");

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, async function(jwt_payload, done) {
      User.findById(jwt_payload.id, function(err, user) {
        if (err) {
          return done(err, false);
        } 
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
