var mongoose = require('mongoose');
var Product = require('../models/Product.js');

module.exports = {

    updateProduct: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Product.findOneAndUpdate({
            _id: req.params.id
        }, req.body, function(err, productItem) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(productItem);
            }
        });
    },
    addNewProduct: function(req, res) {
        console.log("from admin Svc to producsCtrl", req.body);
        new Product(req.body).save(function(err, productItem) {
            if (err) {
                console.log("err from the new Product request");
                return res.status(500).json(err);
            } else {
                console.log(productItem);
                return res.json(productItem);
            }
        });
    },
    destroyProduct: function(req, res) {
        if (!req.params.id) {
            return res.status(400).send('id query needed');
        }
        Product.findByIdAndRemove({
            _id: req.params.id
        }, function(err, productItem) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(productItem);
            }
        });
    },
    getProducts: function(req, res) {
        Product.find().then(function(response) {
            res.send(response);
        });
    }
};
