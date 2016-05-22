var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('./services/passport'),
    passportjs = require('passport'),
    session = require('express-session'),
    keys = require('./keys'),
    serverConfig = require('./serverConfig.js'),
    adminCtrl = require('./controllers/adminCtrl'),
    mongoURI = 'mongodb://localhost:27017/products',
    productsCtrl = require('./controllers/productsCtrl'),
    adminCtrl = require('./controllers/adminCtrl'),
    lessonCtrl = require('./controllers/lessonCtrl'),
    studioSessionsCtrl = require('./controllers/studioSessionsCtrl'),
    app = express(),
    port = serverConfig.serverPort;

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

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});

var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send();
    } else {
        return next();
    }
};

app.post('/api/adminLogin', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.get('/me', isAuthed, adminCtrl.me);
app.get('/api/logout', function(req, res, next) {
    req.logout();
    return res.status(200).send('logged out');
});

app.get('/api/products', productsCtrl.getProducts);
app.post('/api/products', productsCtrl.addNewProduct);
app.put('/api/products/:id', productsCtrl.updateProduct);
app.delete('/api/products/:id', productsCtrl.destroyProduct);

app.post('/api/admin', adminCtrl.create);
app.put('/api/admin/:id', adminCtrl.update);
app.get('/api/admin', adminCtrl.read);
app.delete('/api/admin/:id', adminCtrl.delete);

app.post('/api/lessons', lessonCtrl.create);
app.get('/api/lessons', lessonCtrl.read);
app.delete('/api/lessons/:id', lessonCtrl.delete);
app.put('/api/lessons/:id', lessonCtrl.update);

app.post('/api/studioSessions', studioSessionsCtrl.create);
app.get('/api/studioSessions', studioSessionsCtrl.read);
app.delete('/api/studioSessions/:id', studioSessionsCtrl.delete);
app.put('/api/studioSessions/:id', studioSessionsCtrl.update);
