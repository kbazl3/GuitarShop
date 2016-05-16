var StudioSession = require('./../models/StudioSession');
module.exports = {
    create: function(req, res) {
        StudioSession.create(req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    read: function(req, res) {
        StudioSession.find(req.query, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    update: function(req, res) {
        StudioSession.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    },
    delete: function(req, res) {
        StudioSession.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).send(result);
        });
    }
};
