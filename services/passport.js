var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Admins = require('../models/Admins');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done) {
    Admins.findOne({username: username})
        .exec(function(err, user) {
            if (err) done(err);
            if (!user) return done(null, false);
            if(user.verifyPassword(password)) {
                return done(null, user);}

            return done(null, false); //if none of the if statements were triggered then it will just return done
        });
}));

passport.serializeUser(function(user, done) { //this puts the user on req.user
    done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
    Admins.findById(_id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;
