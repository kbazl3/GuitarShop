var Admins = require('./../models/Admins');
module.exports = {

    read: function(req, res) {
        Admins.find(req.query, function(err, result) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(result);
        });
    },

    create: function(req, res) {
        console.log(req.body);
        Admins.create(req.body, function(err, newUser) {
          if (err) {
            res.status(500).send(err);
        } else {
            newUser.password = null; //when returning a user object, set the password to null
            res.status(200).json(newUser);
        }
        });
    },

    update: function(req, res) {
        Admins.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(result);
        });
    },

    delete: function(req, res) {
        Admins.findByIdAndRemove(req.params.id, function(err, result) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send(result);
        });
    },

    me: function(req, res, next) {
        // if (!req.user) return res.status(401).send('current user not defined');
        req.user.password = null; //when returning a user object, set the password to null
        return res.status(200).json(req.user);
    }

};
