var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    productsCtrl = require('./controllers/productsCtrl'),
    adminCtrl = require('./controllers/adminCtrl'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    Admins = require('./models/Admins'),
    keys = require('./keys'),
    mongoURI = 'mongodb://localhost:27017/products',
    app = express(),
    port = 4700;

var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    } else {
        return next();
    }
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: keys.passportSecret,
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, done) {
    console.log("passport spot");
    Admins.findOne({username: username})
        .exec(function(err, user) {
            console.log("------",user, err);
            if (err) done(err);
            if (!user) return done(null, false);
            if(user.verifyPassword(password)) {
                console.log("Verified Password", user);
                return done(null, user);}

            return done(null, false); //if none of the if statements were triggered then it will just return done
        });
}));

passport.serializeUser(function(user, done) { //this puts the user on req.user
    console.log("hitting serializeUser", user);
    done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
    console.log(_id);
    Admins.findById(_id, function(err, user) {
        console.log(err, user);
        done(err, user);
    });
});

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});

app.get('/api/products', productsCtrl.getProducts);
app.get('/api/products/:id', productsCtrl.getOneProduct);
app.post('/api/products', productsCtrl.addNewProduct);
app.put('/api/products/:id', productsCtrl.updateProduct);
app.delete('/api/products/:id', productsCtrl.destroyProduct);

app.post('/api/adminLogin', passport.authenticate('local', {
    successRedirect: '/me'
}));

app.post('/api/register', adminCtrl.create);

app.get('/me', adminCtrl.me);

app.get('/logout', function(req, res, next) {
    req.logout();
    return res.status(200).send('logged out');
});
