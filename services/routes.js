// var productsCtrl = require('../controllers/productsCtrl'),
//     adminCtrl = require('../controllers/adminCtrl'),
//     lessonCtrl = require('../controllers/lessonCtrl'),
//     mongoose = require('mongoose'),
//     app = require('express')(),
//     studioSessionsCtrl = require('../controllers/studioSessionsCtrl');
//
//
//     module.exports = function(app) {
//
//         app.get('/api/products', productsCtrl.getProducts);
//         app.get('/api/products/:id', productsCtrl.getOneProduct);
//         app.post('/api/products', productsCtrl.addNewProduct);
//         app.put('/api/products/:id', productsCtrl.updateProduct);
//         app.delete('/api/products/:id', productsCtrl.destroyProduct);
//
//         app.post('/api/admin', adminCtrl.create);
//         app.put('/api/admin/:id', adminCtrl.update);
//         app.get('/api/admin', adminCtrl.read);
//         app.delete('/api/admin/:id', adminCtrl.delete);
//
//         app.post('/api/lessons', lessonCtrl.create);
//         app.get('/api/lessons', lessonCtrl.read);
//         app.delete('/api/lessons/:id', lessonCtrl.delete);
//         app.put('/api/lessons/:id', lessonCtrl.update);
//
//         app.post('/api/studioSessions', studioSessionsCtrl.create);
//         app.get('/api/studioSessions', studioSessionsCtrl.read);
//         app.delete('/api/studioSessions/:id', studioSessionsCtrl.delete);
//         app.put('/api/studioSessions/:id', studioSessionsCtrl.update);
//
//     };
